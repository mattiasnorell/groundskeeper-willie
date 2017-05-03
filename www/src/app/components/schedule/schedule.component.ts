import { Component, OnInit } from '@angular/core';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { Zone } from '../../../models/zone.model';
import { ScheduleService } from './schedule.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
	selector:'schedule',
	providers: [ScheduleService],
	templateUrl: './schedule.component.html',
	styles: ['./schedule.component.scss']
})

export class ScheduleComponent {
	schedule: FirebaseListObservable<ScheduleDay[]>;
	zones: FirebaseListObservable<Zone[]>;

	constructor(private scheduleService:ScheduleService){}

	ngOnInit():void{
		this.schedule = this.scheduleService.getSchedule();
		this.zones = this.scheduleService.getZones();
	}
}