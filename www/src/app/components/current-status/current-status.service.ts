import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { CurrentStatus } from './current-status.model';

@Injectable()
export class CurrentStatusService{
    private apiUrl:string = "/src/api/status.mock.json";

    constructor(private http:Http){}

    getStatus(): Promise<CurrentStatus>{
        return this.http.get(this.apiUrl).toPromise().then(response => response.json() as CurrentStatus);
    }
}