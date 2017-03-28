import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LogItem } from './logitem.model';

@Injectable()
export class LogService{
    private apiUrl:string = "/src/api/log.mock.json";

    constructor(private http:Http){}

    getAll(): Promise<LogItem[]>{
        return this.http.get(this.apiUrl).toPromise().then(response => response.json().logs as LogItem[] );
    }
}