import { Component, OnInit } from '@angular/core';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { Zone } from '../../../models/zone.model';
import { SettingsService } from './settings.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
	selector:'settings',
	providers: [SettingsService],
	templateUrl: './settings.component.html',
	styles: ['./settings.component.scss']
})

export class SettingsComponent {
	schedule: FirebaseListObservable<ScheduleDay[]>;
	zones: FirebaseListObservable<Zone[]>;

	constructor(private settingsService:SettingsService){
		
	}

	ngOnInit():void{
		this.schedule = this.settingsService.getSchedule();
		this.zones = this.settingsService.getZones();
	}
}