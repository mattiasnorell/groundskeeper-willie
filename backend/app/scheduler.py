import asyncio
import logging
from datetime import datetime, timezone

from app.models import Schedule
from app.mqtt import publish_command

logger = logging.getLogger(__name__)


async def check_schedules():
    while True:
        now = datetime.now(timezone.utc)
        seconds_until_next_minute = 60 - now.second - now.microsecond / 1_000_000
        await asyncio.sleep(seconds_until_next_minute)

        try:
            now = datetime.now(timezone.utc)
            current_day = now.strftime("%a").lower()
            current_time = now.strftime("%H:%M")

            schedules = await Schedule.find(Schedule.enabled == True).to_list()
            for schedule in schedules:
                if current_day not in schedule.days:
                    continue
                if current_time == schedule.start_time:
                    logger.info("Schedule %s: sending start", schedule.id)
                    await publish_command("start")
                elif current_time == schedule.stop_time:
                    logger.info("Schedule %s: sending stop", schedule.id)
                    await publish_command("stop")
        except Exception:
            logger.exception("Scheduler error")
