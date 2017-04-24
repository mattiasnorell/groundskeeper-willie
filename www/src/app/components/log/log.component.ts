import { Component, Input, OnInit } from '@angular/core';
import { LogItem } from './logitem.model';
import { LogService } from './log.service';
import {FirebaseListObservable} from 'angularfire2';

@Component({
	selector:'log-list',
	providers: [LogService],
	templateUrl: './log.component.html',
	styles: ['./log.component.scss']
})

export class LogComponent {
	logItems: FirebaseListObservable<LogItem[]>;

	constructor(private logService:LogService){}
		
	ngOnInit(): void{
		this.logItems = this.logService.getAll();
	}
} 