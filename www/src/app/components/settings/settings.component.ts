import { Component, OnInit } from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { SettingsService } from './settings.service';

@Component({
	selector:'settings',
	providers: [SettingsService],
	templateUrl: './settings.component.html',
	styles: ['./settings.component.scss']
})

export class SettingsComponent {
  	zones: Zone[];
	schedule: ScheduleDay[];

	constructor(private settingsService:SettingsService){
		
	}

	ngOnInit():void{
		this.settingsService.getZones().then((result) => {
			this.zones = result;
		});
	}
}