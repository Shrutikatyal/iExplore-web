import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserData } from '../models/UserData'

@Injectable({
  providedIn: 'root'
})
export class MapService {

  serverUrl:string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  getMarkers():Observable<UserData[]>{
    return this.http.get<UserData[]>(this.serverUrl + '/view/1/allUsers')
  }

  getMapCenter():Observable<{lat:number, long:number}>{
    return this.http.get<{lat:number, long:number }>(this.serverUrl + '/building/1/center');
  }
}
