import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Zone } from './zone.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SettingsService{

    private items: FirebaseListObservable<Zone[]>;

    constructor(private af:AngularFire){
        this.items = this.af.database.list("/schedule");
    }
}