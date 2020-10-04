import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

const BASE_URL = 'http://localhost:4000';
@Injectable({
  providedIn: 'root'
})


export class BackendService {

  private userSubscribedList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  setUserSubscribedList(list: any){
    this.userSubscribedList$.next(list);
  }

  getUserSubscribedList(){
    return this.userSubscribedList$;
  }
 
  constructor(private httpClient: HttpClient) { }


  public loginCheck(loginDetails: any){
    let body = JSON.stringify(loginDetails);
    return this.httpClient.post(`${BASE_URL}/login`,body, {
      headers: new HttpHeaders({ 'content-type' : 'application/json'})
    })
  }

  public registeruserDetails(registerDetails: any){
    let body = JSON.stringify(registerDetails);
    return this.httpClient.post(`${BASE_URL}/register`,body, {
      headers: new HttpHeaders({ 'content-type' : 'application/json'})
    })
  }

  public getAllChannels(){
    return this.httpClient.get(`${BASE_URL}/getAllChannels`)
  }

  public getUserSubscribedChannels(username: string){
    return this.httpClient.get(`${BASE_URL}/getSubscriptionInfo?username=${username}`)
  }

  public saveUserSubscriptionDetails(subsciptionInfo: any){
    let body = JSON.stringify(subsciptionInfo);
    return this.httpClient.post(`${BASE_URL}/updateSubscriptionDetails`,body, {
      headers: new HttpHeaders({ 'content-type' : 'application/json'})
    })
  }

}
