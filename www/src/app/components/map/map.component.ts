import { Component, Input, OnInit } from '@angular/core';
import { MapService } from './map.service';
import {Map } from './map.model';

@Component({
	selector:'map',
	providers: [MapService],
	templateUrl: './map.component.html',
	styles: ['./map.component.scss']
})

export class MapComponent implements OnInit{
	status: String = "Laddar...";

	constructor(private mapService: MapService){ }

	ngOnInit(): void{
		this.mapService.getStatus().then(response => 	this.status = response.status);
	}
} 