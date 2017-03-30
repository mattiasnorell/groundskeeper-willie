import { Component, Input, OnInit } from '@angular/core';
import { LogService } from './log.service';
import { LogItem } from './logitem.model';

@Component({
	selector:'log',
	providers: [LogService],
	templateUrl: './log.component.html',
	styleUrls: ['./log.component.less']
})

export class LogComponent {
	logItems: LogItem[] = null;

	constructor(private logService: LogService){}
		
	ngOnInit(): void{
		this.logService.getAll().then(response => this.logItems = response);
	}
} 