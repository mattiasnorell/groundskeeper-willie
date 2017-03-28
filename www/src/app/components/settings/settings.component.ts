import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Zone } from './zone.model';

@Component({
	selector:'settings',
	providers: [SettingsService],
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
	zones: Zone[] = [];

	constructor(private settingsService: SettingsService){ }

	ngOnInit(){
		this.settingsService.getAll().then(response => this.zones = response);
	}
} 