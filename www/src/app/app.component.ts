import { Component } from '@angular/core';

@Component({
	selector:'groundskeeper-willy',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})

export class AppComponent {
	zones: String[] = ["zone 0"];

	constructor(){
		this.zones.push("zone 1");
		this.zones.push("zone 2");
	}
} 