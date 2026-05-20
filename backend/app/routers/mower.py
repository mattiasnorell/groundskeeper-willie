from fastapi import APIRouter, HTTPException

from app.models import Location, MowerStatus
from app.mqtt import publish_command

router = APIRouter(prefix="/api/mower", tags=["mower"])


@router.get("/status")
async def get_status():
    status = await MowerStatus.find_one()
    if not status:
        raise HTTPException(status_code=404, detail="No status available")
    return status


@router.get("/location")
async def get_location():
    location = await Location.find().sort("-timestamp").first_or_none()
    if not location:
        raise HTTPException(status_code=404, detail="No location available")
    return location


@router.get("/track")
async def get_track(session_id: str):
    locations = await Location.find(Location.session_id == session_id).sort("+timestamp").to_list()
    return locations


@router.post("/start")
async def start_mower():
    await publish_command("start")
    return {"message": "Start command sent"}


@router.post("/stop")
async def stop_mower():
    await publish_command("stop")
    return {"message": "Stop command sent"}


@router.post("/home")
async def send_home():
    await publish_command("home")
    return {"message": "Home command sent"}
