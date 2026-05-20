import asyncio
import json
import logging
import os
from datetime import datetime, timezone

import aiomqtt
from beanie import PydanticObjectId

from app.models import Location, MowerStatus, Session
from app.websocket_manager import manager

MQTT_HOST = os.getenv("MQTT_HOST", "mosquitto")
MQTT_PORT = int(os.getenv("MQTT_PORT", "1883"))

logger = logging.getLogger(__name__)

_publish_queue: asyncio.Queue = asyncio.Queue()
_active_session_id: str | None = None


async def publish_command(command: str):
    await _publish_queue.put(json.dumps({"command": command}))


async def _handle_location(payload: dict):
    global _active_session_id
    now = datetime.now(timezone.utc)

    if not _active_session_id:
        session = Session(started_at=now)
        await session.insert()
        _active_session_id = str(session.id)

    loc = Location(
        session_id=_active_session_id,
        lat=payload["lat"],
        lng=payload["lng"],
        timestamp=now,
        speed=payload.get("speed", 0.0),
    )
    await loc.insert()
    await Session.find_one(Session.id == PydanticObjectId(_active_session_id)).update(
        {"$push": {"locations": str(loc.id)}}
    )

    await manager.broadcast(
        {
            "type": "location",
            "lat": loc.lat,
            "lng": loc.lng,
            "timestamp": loc.timestamp.isoformat(),
        }
    )


async def _handle_status(payload: dict):
    global _active_session_id
    now = datetime.now(timezone.utc)
    new_state = payload["state"]

    status = await MowerStatus.find_one()
    old_state = status.state if status else None

    if new_state == "mowing" and old_state != "mowing":
        session = Session(started_at=now)
        await session.insert()
        _active_session_id = str(session.id)
    elif old_state == "mowing" and new_state != "mowing" and _active_session_id:
        session = await Session.get(PydanticObjectId(_active_session_id))
        if session:
            session.stopped_at = now
            await session.save()
        _active_session_id = None

    if status:
        status.state = new_state
        status.battery = payload["battery"]
        status.last_seen = now
        await status.save()
    else:
        status = MowerStatus(
            state=new_state, battery=payload["battery"], last_seen=now
        )
        await status.insert()

    await manager.broadcast(
        {"type": "status", "state": status.state, "battery": status.battery}
    )


async def mqtt_listener():
    while True:
        try:
            async with aiomqtt.Client(MQTT_HOST, MQTT_PORT) as client:
                await client.subscribe("mower/location")
                await client.subscribe("mower/status")
                logger.info("MQTT connected to %s:%s", MQTT_HOST, MQTT_PORT)

                async def _publisher():
                    while True:
                        msg = await _publish_queue.get()
                        await client.publish("mower/command", msg)

                async def _listener():
                    async for message in client.messages:
                        topic = str(message.topic)
                        try:
                            payload = json.loads(message.payload.decode())
                            if topic == "mower/location":
                                await _handle_location(payload)
                            elif topic == "mower/status":
                                await _handle_status(payload)
                        except Exception:
                            logger.exception("Error processing MQTT message on %s", topic)

                await asyncio.gather(_publisher(), _listener())

        except Exception:
            logger.exception("MQTT connection lost, retrying in 5s")
            await asyncio.sleep(5)
