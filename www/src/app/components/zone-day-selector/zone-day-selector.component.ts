import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Zone } from '../../../models/zone.model';

@Component({
	selector:'zone-day-selector',
	templateUrl: './zone-day-selector.component.html',
	styles: ['./zone-day-selector.component.css']
})

export class ZoneDaySelectorComponent {
	weekDays: String[] = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

	@Input() zone: Zone;
	@Output() update = new EventEmitter();

	constructor(){ 
	
	}

	setDay(day:String){
		this.update.emit(day);
	}
} 