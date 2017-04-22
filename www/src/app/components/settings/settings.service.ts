import { Injectable } from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { Http } from '@angular/http';
import { ScheduleDay } from '../../../models/scheduleDay.model';

@Injectable()
export class SettingsService{

    private items: Zone[];

    private apiUrl:string = "/src/api/zone.mock.json";

    constructor(private http:Http){}
    
    getZones():Promise<Zone[]>{
        return this.http.get(this.apiUrl).toPromise().then(response => response.json() as Zone[]);
    }

    getSchedule():ScheduleDay[]{
        return null;
    }

    updateDayForZone(id: string, zoneId: string, day:Number){
        console.log(id, day);
    }
}