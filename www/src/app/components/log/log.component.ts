import { Component, Input, OnInit } from '@angular/core';
import { LogItem } from './logitem.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
	selector:'log',
	templateUrl: './log.component.html',
	styles: ['./log.component.css']
})

export class LogComponent {
	logItems: FirebaseListObservable<LogItem[]>;

	constructor(private af:AngularFire){}
		
	ngOnInit(): void{
		this.logItems = this.af.database.list("/log");
	}
} 