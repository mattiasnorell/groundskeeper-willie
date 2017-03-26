import { Component, Input } from '@angular/core';

@Component({
	selector:'current-status',
	templateUrl: './current-status.component.html',
	styleUrls: ['./current-status.component.css']
})

export class CurrentStatusComponent {
	status: String;

	constructor(){
		this.status = "Ute och kör";
	}

	changeStatus(){
		this.status = "Står och vilar";
	}
} 