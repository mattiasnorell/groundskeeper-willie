import { Component, OnInit } from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { SettingsService } from './settings.service';

@Component({
	selector:'settings',
	providers: [SettingsService],
	templateUrl: './settings.component.html',
	styles: ['./settings.component.css']
})

export class SettingsComponent {
  	zones: Zone[];
	schedule: ScheduleDay[];

	constructor(private settingsService:SettingsService){

	 }

	ngOnInit():void{
		this.settingsService.getZones().then((result) => {
			console.log(result)
			this.zones = result;
		});
	}

	createZone(){
		//this.af.database.list('/zones').push({name:"Zon"});
	}

	selectorUpdated(day:ScheduleDay, zone:Zone){
		
	}
}