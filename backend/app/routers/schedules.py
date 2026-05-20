from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.models import Schedule

router = APIRouter(prefix="/api/schedules", tags=["schedules"])


class SchedulePayload(BaseModel):
    days: list[str]
    start_time: str
    stop_time: str
    enabled: bool = True


@router.get("/")
async def list_schedules():
    return await Schedule.find_all().to_list()


@router.post("/", status_code=201)
async def create_schedule(data: SchedulePayload):
    schedule = Schedule(**data.model_dump())
    await schedule.insert()
    return schedule


@router.put("/{id}")
async def update_schedule(id: PydanticObjectId, data: SchedulePayload):
    schedule = await Schedule.get(id)
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    for field, value in data.model_dump().items():
        setattr(schedule, field, value)
    await schedule.save()
    return schedule


@router.delete("/{id}", status_code=204)
async def delete_schedule(id: PydanticObjectId):
    schedule = await Schedule.get(id)
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    await schedule.delete()
