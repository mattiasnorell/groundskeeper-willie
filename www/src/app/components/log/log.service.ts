import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LogItem } from './logitem.model';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Injectable()
export class LogService{
    
    constructor(private af: AngularFire){}

    getAll(): FirebaseListObservable<LogItem[]>{
        return this.af.database.list('/log', {
           query: {
                limitToLast: 10,
                orderByKey: true
           } 
        });
    }
}