import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';

@Injectable()
export class FollowSevice {
  public url: String;
  public identity: any;
  public token: any;
  public stats: any;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  addFollow(token: any, follow: any): Observable<any> {
    let params = JSON.stringify(follow);
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'follow', params, {
      headers: Headers,
    });
  }

  deleteFollow(token: any, id: any): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'follow/' + id, {
      headers: Headers,
    });
  }

  getFollowing(token: any, userId = null, page = 1): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    let url = this.url + 'following';
    if (userId != null) {
      url = this.url + 'following/' + userId + '/' + page;
    }

    return this._http.get(url, {
      headers: Headers,
    });
  }

  getFollowed(token: any, userId = null, page = 1): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    let url = this.url + 'followed';
    if (userId != null) {
      url = this.url + 'followed/' + userId + '/' + page;
    }

    return this._http.get(url, {
      headers: Headers,
    });
  }

  getMyFollows(token: any): Observable<any> {
    let Headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

    return this._http.get(this.url +'get-my-follows/true', {
      headers: Headers
    });
  }



}
