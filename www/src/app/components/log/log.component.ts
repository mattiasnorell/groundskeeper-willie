import { Component, Input, OnInit } from '@angular/core';
import { LogItem } from './logitem.model';
import { LogService } from './log.service';

@Component({
	selector:'log-list',
	providers: [LogService],
	templateUrl: './log.component.html',
	styles: ['./log.component.scss']
})

export class LogComponent {
	logItems: LogItem[];

	constructor(private logService:LogService){}
		
	ngOnInit(): void{
		this.logService.getAll().then((result) => {
			console.log(result);
			this.logItems = result;
		});
	}
} 