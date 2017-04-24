import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MapPosition } from './mapPosition.model';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class MapService{
    
    constructor(private af:AngularFire){}

    getStatus(): FirebaseObjectObservable<MapPosition>{
        return this.af.database.object('/position');
    }
}