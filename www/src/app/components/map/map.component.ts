import { Component, Input, OnInit, AfterContentInit  , ViewChild,ElementRef } from '@angular/core';
import { MapService } from './map.service';
import {MapPosition } from './mapPosition.model';

@Component({
	selector:'map',
	providers: [MapService],
	templateUrl: './map.component.html',
	styles: ['./map.component.scss']
})

export class MapComponent implements OnInit {
	@ViewChild("mapCanvas") mapCanvas:ElementRef; 

	position: MapPosition = null;

	constructor(private mapService: MapService){ }

	ngOnInit(): void{
		this.mapService.getStatus().then(response => this.position = response);
	}

	ngAfterContentInit () {
		let canvas: HTMLCanvasElement = this.mapCanvas.nativeElement;
		let context: CanvasRenderingContext2D = canvas.getContext("2d");
		let image = new Image();

		image.onload = () => {
			canvas.width = 400;
			canvas.height = 600;
			context.drawImage(image, 0, 0, 400, 600);

			icon.src = "/src/img/worx.png";
		}

		let icon = new Image();
		icon.onload = () => {
			context.drawImage(icon, this.position.latitude, this.position.longitude);
		}
		
		image.src = "/src/img/map.png";
	}
} 