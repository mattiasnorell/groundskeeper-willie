import { Component, OnInit } from '@angular/core';
import { Zone } from './zone.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector:'settings',
	templateUrl: './settings.component.html',
	styles: ['./settings.component.css']
})

export class SettingsComponent {
  	zones: FirebaseListObservable<Zone[]>;

	constructor(private af:AngularFire){ }

	ngOnInit():void{
		this.zones = this.af.database.list('/zones');
	}

	createZone(){
		this.af.database.list('/zones').push({name:"Zon"});
	}
}