import { Component, Input } from '@angular/core';

@Component({
	selector:'zone-day-selector',
	templateUrl: './zone-day-selector.component.html',
	styleUrls: ['./zone-day-selector.component.less']
})

export class ZoneDaySelectorComponent {
	weekDays: String[] = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"];

	@Input() title: String;

	setDay(day:String){
		console.log(day);
	}
} 