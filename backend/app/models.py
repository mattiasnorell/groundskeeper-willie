from typing import Literal, Optional
from datetime import datetime
from beanie import Document
from pydantic import Field
import pymongo


class Location(Document):
    session_id: str
    lat: float
    lng: float
    timestamp: datetime
    speed: float = 0.0

    class Settings:
        name = "mower_locations"
        indexes = [
            pymongo.IndexModel(
                [("timestamp", pymongo.ASCENDING)],
                expireAfterSeconds=30 * 24 * 60 * 60,
            )
        ]


class MowerStatus(Document):
    state: Literal["mowing", "charging", "idle", "error"]
    battery: int
    last_seen: datetime

    class Settings:
        name = "mower_status"


class Session(Document):
    started_at: datetime
    stopped_at: Optional[datetime] = None
    locations: list[str] = Field(default_factory=list)

    class Settings:
        name = "mower_sessions"


class Schedule(Document):
    days: list[str]
    start_time: str
    stop_time: str
    enabled: bool = True

    class Settings:
        name = "schedules"
