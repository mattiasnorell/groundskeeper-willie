import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CurrentStatus } from './current-status.model';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class CurrentStatusService{
    private apiUrl:string = "/src/api/status.mock.json";

    constructor(private af: AngularFire){}

    getStatus(): FirebaseObjectObservable<CurrentStatus>{
        return this.af.database.object("/status");
    }
}