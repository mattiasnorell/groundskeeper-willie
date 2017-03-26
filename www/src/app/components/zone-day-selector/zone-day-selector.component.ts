import { Component, Input } from '@angular/core';

@Component({
	selector:'zone-day-selector',
	templateUrl: './zone-day-selector.component.html',
	styleUrls: ['./zone-day-selector.component.css']
})

export class ZoneDaySelectorComponent {
	@Input() title: String;
} 