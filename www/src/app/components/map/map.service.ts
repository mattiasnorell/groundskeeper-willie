import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MapPosition } from './mapPosition.model';

@Injectable()
export class MapService{
    private apiUrl:string = "/src/api/map.mock.json";

    constructor(private http:Http){}

    getStatus(): Promise<MapPosition>{
        return this.http.get(this.apiUrl).toPromise().then(response => response.json() as MapPosition);
    }
}