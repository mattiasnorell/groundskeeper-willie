import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Zone } from '../../../models/zone.model';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class SettingsService{

    constructor(private af:AngularFire){}
    
    getZones():FirebaseListObservable<Zone[]>{
        return this.af.database.list("/zones");
    }

    getSchedule(orderBy: string = "day"):FirebaseListObservable<ScheduleDay[]>{
         return this.af.database.list("/schedule", {
             query: {
                 orderByChild: orderBy
             }
         });
    }

    updateDayForZone(day:Number, zoneId: string){
        this.af.database.object("/schedule/" + day).update({zone: zoneId});
    }
}