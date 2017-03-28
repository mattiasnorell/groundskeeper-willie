import { Component, Input, OnInit } from '@angular/core';
import { CurrentStatusService } from './current-status.service';
import {CurrentStatus } from './current-status.model';

@Component({
	selector:'current-status',
	providers: [CurrentStatusService],
	templateUrl: './current-status.component.html',
	styleUrls: ['./current-status.component.css']
})

export class CurrentStatusComponent implements OnInit{
	status: String = "Laddar...";

	constructor(private currentStatusService: CurrentStatusService){ }

	ngOnInit(): void{
		this.currentStatusService.getStatus().then(response => 	this.status = response.status);
	}
} 