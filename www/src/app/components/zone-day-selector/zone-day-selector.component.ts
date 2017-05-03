import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import { Zone } from '../../../models/zone.model';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { ScheduleService } from './../schedule/schedule.service';
import { FirebaseListObservable } from 'angularfire2';

@Component({
	selector:'[zone-day-selector]',
	providers: [ScheduleService],
	templateUrl: './zone-day-selector.component.html',
	styles: ['./zone-day-selector.component.scss']
})

export class ZoneDaySelectorComponent {
	
	@Input() day: ScheduleDay;
	@Output() update = new EventEmitter();

	edit:boolean = false;
	dayNames: string[] = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
	zones: FirebaseListObservable<Zone[]>;
	
	constructor(private scheduleService:ScheduleService){ 
		
	}

	ngOnInit():void{
		this.zones = this.scheduleService.getZones();
	}

	updateZone(zone:string){
		this.scheduleService.updateDayForZone(this.day.$key, parseInt(zone));

		this.edit = false;
	}
} 