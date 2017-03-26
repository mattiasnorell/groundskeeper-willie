import { Component, Input } from '@angular/core';

@Component({
	selector:'log',
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.css']
})

export class LogComponent {
	logItems: String[] = [];

	constructor(){
		for(let i = 1; i <= 10; i++){
			this.logItems.push("Log item " + i);
		}
	}	
} 