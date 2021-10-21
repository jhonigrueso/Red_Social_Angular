import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { Global } from './global';

@Injectable()
export class PublicationSevice {
  public url: String;
  public identity: any;
  public token: any;
  public stats: any;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  addPublication(token: any, publication: any): Observable<any> {
    let params = JSON.stringify(publication);
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.post(this.url + 'publication', params, {
      headers: Headers,
    });
  }

  getPublications(token: any, page = 1): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'publications/' + page, {
      headers: Headers,
    });
  }

  getPublicationsUser(token: any, user_id:any, page = 1): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.get(this.url + 'publications-user/' +user_id+'/'+ page, {
      headers: Headers,
    });
  }

  deletePublication(token: any, id: any): Observable<any> {
    let Headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', token);

    return this._http.delete(this.url + 'publication/' + id, {
      headers: Headers,
    });
  }
}
