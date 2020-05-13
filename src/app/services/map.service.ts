import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { UserData } from '../models/UserData'
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  buildingId:string ='1';
  serverUrl:string = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  setBuildingId(buildingId){
    this.buildingId = buildingId;
  }

  getBuildingId(){
    return this.buildingId;
  }

  getUserNames():Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl+'/view/'+this.buildingId+'/allUserName');
  }

  getBuildingNames():Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl+'/view/allBuildingName');
  }

  getMarkers():Observable<UserData[]>{
    return this.http.get<UserData[]>(this.serverUrl + '/view/'+this.buildingId+'/allUsers')
  }

  getMapCenter():Observable<{lat:number, long:number}>{
    return this.http.get<{lat:number, long:number }>(this.serverUrl + '/view/'+this.buildingId+'/center');
  }

  getUserLocation(userID):Observable<{lat:number, long:number}>{
    return this.http.get<{lat:number, long:number }>(this.serverUrl +'/view/'+this.buildingId+'/'+userID);
  }

}
