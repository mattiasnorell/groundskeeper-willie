import { Component } from '@angular/core';

@Component({
	selector:'settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
	zones: String[] = ["zone 0"];

	constructor(){
		this.zones.push("zone 1");
		this.zones.push("zone 2");
	}
} 