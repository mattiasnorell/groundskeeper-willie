import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Map } from './map.model';

@Injectable()
export class MapService{
    private apiUrl:string = "/src/api/status.mock.json";

    constructor(private http:Http){}

    getStatus(): Promise<Map>{
        return this.http.get(this.apiUrl).toPromise().then(response => response.json() as Map);
    }
}