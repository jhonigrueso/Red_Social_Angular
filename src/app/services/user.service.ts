import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';
@Injectable()
export class UserService {
  public url: String;
  public identity: any;
  public token: any;
  public stats: any;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  testService() {
    console.log('probando el servicio de angular');
  }

  saveUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let Headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'register', params, {
      headers: Headers,
    });
  }

  signup(user: User, gettoken = ''): Observable<any> {
    if (gettoken != null) {
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let Headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + 'login', params, {
      headers: Headers,
    });
  }

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') || 'null');

    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');

    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats') || 'null');

    if (stats != 'undefined') {
      this.stats = stats;
    } else {
      this.stats = null;
    }
    return this.stats;
  }

  getCounters(userId = null): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    if (userId != null) {
      return this._http.get(this.url + 'counters/' + userId, {
        headers: Headers,
      });
    } else {
      return this._http.get(this.url + 'counters', { headers: Headers });
    }
  }

  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.put(this.url + 'update-user/' + user._id, params, {
      headers: Headers,
    });
  }

  getUsers(page = null): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.get(this.url + 'users/' + page, { headers: Headers });
  }

  getUser(id: any): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());

    return this._http.get(this.url + 'user/' + id, { headers: Headers });
  }
}
