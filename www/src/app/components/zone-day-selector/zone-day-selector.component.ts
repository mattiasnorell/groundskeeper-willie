import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { SettingsService } from './../settings/settings.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
	selector:'[zone-day-selector]',
	providers: [SettingsService],
	templateUrl: './zone-day-selector.component.html',
	styles: ['./zone-day-selector.component.scss']
})

export class ZoneDaySelectorComponent {
	
	@Input() day: ScheduleDay;
	@Output() update = new EventEmitter();

	edit:boolean = false;
	dayNames: string[] = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
	zones: FirebaseListObservable<Zone[]>;
	
	constructor(private settingsService:SettingsService){ 
		
	}

	ngOnInit():void{
		this.zones = this.settingsService.getZones();
	}

	updateZone(zone:string){
		this.settingsService.updateDayForZone(this.day.$key, parseInt(zone));

		this.edit = false;
	}
} 