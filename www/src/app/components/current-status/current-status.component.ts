import { Component, Input, OnInit } from '@angular/core';
import { CurrentStatusService } from './current-status.service';
import {CurrentStatus } from './current-status.model';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
	selector:'current-status',
	providers: [CurrentStatusService],
	templateUrl: './current-status.component.html',
	styles: ['./current-status.component.scss']
})

export class CurrentStatusComponent implements OnInit{
	status: Number = -1;

	message: String[] = [
		"Laddar",
		"Ute och kör"
	];

	image: String[] = [
		"https://thumbs.dreamstime.com/z/automatic-mower-modern-lawn-docking-station-charging-battery-its-self-mowing-device-image-taken-outside-garden-40225783.jpg",
		"http://husqvarnacdn.azureedge.net//qs_h=720&crop=1&w=720&ver=00000000T000000/_$$_/media/dam/husqvarna/garden%20lawnmowers%20and%20ride-on%20mowers/robotic%20lawnmowers/2014/12/08/20/35/h350-0237.ashx"
	];
	
	constructor(private currentStatusService: CurrentStatusService){ }

	ngOnInit(): void{
		let service = this.currentStatusService.getStatus();

		service.subscribe(value => {
			this.status = value.status;
		});
	}
} 