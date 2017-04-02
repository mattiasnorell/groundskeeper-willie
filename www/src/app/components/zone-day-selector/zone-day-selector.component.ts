import { Component, Input } from '@angular/core';

@Component({
	selector:'zone-day-selector',
	templateUrl: './zone-day-selector.component.html',
	styles: ['./zone-day-selector.component.css']
})

export class ZoneDaySelectorComponent {
	weekDays: String[] = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

	@Input() title: String;

	setDay(day:String){
		console.log(day);
	}
} 