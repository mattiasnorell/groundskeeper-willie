import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models import Location, MowerStatus, Session, Schedule

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://mongodb:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "groundskeeper")


async def init_db():
    client = AsyncIOMotorClient(MONGODB_URI)
    await init_beanie(
        database=client[DATABASE_NAME],
        document_models=[Location, MowerStatus, Session, Schedule],
    )
