import { Component, OnInit } from '@angular/core';
import { ScheduleDay } from '../../../models/scheduleDay.model';
import { Observable } from 'rxjs/Observable';
import { Zone } from '../../../models/zone.model';
import { ScheduleService } from './schedule.service';
import { FirebaseListObservable } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseAuthService } from '../../services/firebaseAuth.service';

@Component({
	selector:'schedule',
	providers: [ScheduleService, FirebaseAuthService],
	templateUrl: './schedule.component.html',
	styles: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit{
	schedule: FirebaseListObservable<ScheduleDay[]>;
	zones: FirebaseListObservable<Zone[]>;

	constructor(private scheduleService:ScheduleService, public afAuthService: FirebaseAuthService){}

	ngOnInit():void{
		this.schedule = this.scheduleService.getSchedule();
		this.zones = this.scheduleService.getZones();
	}

	isAuth(){
		return this.afAuthService.isAuthenticated();
	}

	login() {
		this.afAuthService.login("mattias.norell@gmail.com", "abc123");
	}

	logout() {
		this.afAuthService.logout();
	}
}