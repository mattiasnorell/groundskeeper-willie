import { Component, Input, OnInit, AfterContentInit  , ViewChild,ElementRef } from '@angular/core';
import { MapService } from './map.service';
import {MapPosition } from './mapPosition.model';
import {FirebaseObjectObservable} from 'angularfire2';

@Component({
	selector:'map',
	providers: [MapService],
	templateUrl: './map.component.html',
	styles: ['./map.component.scss']
})

export class MapComponent implements OnInit {
	@ViewChild("mapCanvas") mapCanvas:ElementRef; 

	position: MapPosition = null;
	service: FirebaseObjectObservable<MapPosition>;
	private canvasWidth: number = 350;
	private canvasHeight: number = 550;

	constructor(private mapService: MapService){ }

	convertGpsToPixels(gpsCoordinates: MapPosition):MapPosition{
		
		var topLatitude:number = 59.322533;
		var bottomLatitude:number = 59.322048;
		var latitudeDiff = topLatitude - bottomLatitude;
	
		var leftLongitude:number = 13.456358;
		var rightLongitude:number = 13.457133;
		var longitudeDiff:number = rightLongitude - leftLongitude;
		
		var iconLatitude:number  = gpsCoordinates.latitude;
		var iconLatitudeDiff:number = topLatitude - iconLatitude;
		var iconLatitudePosition:number = (iconLatitudeDiff / latitudeDiff) * this.canvasWidth;
	
		var iconLongitude:number = gpsCoordinates.longitude;
		var iconLongitudeDiff: number = rightLongitude - iconLongitude;
		var iconLongitudePosition:number = (iconLongitudeDiff / longitudeDiff) * this.canvasHeight;
	
		var positions = new MapPosition();
		positions.latitude = Math.floor(iconLatitudePosition);
		positions.longitude = Math.floor(iconLongitudePosition);
		
		return positions;
	}

	ngOnInit(): void{
		this.service = this.mapService.getStatus();	
	}

	ngAfterContentInit () {

		let canvas: HTMLCanvasElement = this.mapCanvas.nativeElement;
		let context: CanvasRenderingContext2D = canvas.getContext("2d");
		let image = new Image();
		let icon = new Image();

		this.service.subscribe(obj => {
			var positionInPixels = this.convertGpsToPixels(obj);
			
			image.onload = () => {
				canvas.width = this.canvasWidth;
				canvas.height = this.canvasHeight;
				context.drawImage(image, 0, 0, this.canvasWidth, this.canvasHeight);

				icon.src = "/src/img/worx.png";
			}
		
			icon.onload = () => {
				context.drawImage(icon, positionInPixels.latitude, positionInPixels.longitude);
			}
			
			image.src = "/src/img/map.png";

		});

	}
} 