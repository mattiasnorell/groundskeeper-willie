import asyncio
import json
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.mqtt import mqtt_listener, publish_command
from app.routers.mower import router as mower_router
from app.routers.schedules import router as schedules_router
from app.scheduler import check_schedules
from app.websocket_manager import manager

logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    asyncio.create_task(mqtt_listener())
    asyncio.create_task(check_schedules())
    yield


app = FastAPI(title="Groundskeeper Willy", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mower_router)
app.include_router(schedules_router)


@app.websocket("/ws/mower")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            raw = await websocket.receive_text()
            msg = json.loads(raw)
            if msg.get("type") in ("start", "stop", "home"):
                await publish_command(msg["type"])
    except WebSocketDisconnect:
        manager.disconnect(websocket)
