import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CurrentStatus } from './current-status.model';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class CurrentStatusService{
    private apiUrl:string = "/src/api/status.mock.json";

    status: FirebaseObjectObservable<CurrentStatus> = null;

    constructor(private af: AngularFire){
        this.status = af.database.object("/status");
    }

    getStatus(): FirebaseObjectObservable<CurrentStatus>{
        return this.status;
    }
}