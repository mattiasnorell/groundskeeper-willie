import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Zone } from './zone.model';

@Injectable()
export class SettingsService{
    private apiUrl:string = "/src/api/zone.mock.json";

    constructor(private http:Http){}

    getAll(): Promise<Zone[]>{
        return this.http.get(this.apiUrl).toPromise().then(response => response.json().zones as Zone[] );
    }
}