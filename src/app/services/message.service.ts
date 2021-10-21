import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { Global } from './global';
@Injectable()
export class MessageService {
  public url: String;
  public identity: any;
  public token: any;
  public stats: any;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  addMessage(token: any, menssage: any): Observable<any> {
    let params = JSON.stringify(menssage);
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'message', params, {
      headers: Headers,
    });
  }

  getMyMessages(token: any, page = 1): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'my-messages/' + page, {
      headers: Headers,
    });
  }

  getEmmitMessages(token: any, page = 1): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'messages/' + page, {
      headers: Headers,
    });
  }
}
