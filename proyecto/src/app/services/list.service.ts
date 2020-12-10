import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public url: string;
  public identity;
  public token;


  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }
 

  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token');
    if (token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }


  getLists(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this._http.get(this.url + 'lists/' + id, httpOptions);

  }


  getList(id): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this._http.get(this.url + 'list/' + id, httpOptions);

  }

  getListAndSongs(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this._http.get(this.url + 'listandsongs/' + id, httpOptions);

  }


  addList(obj): Observable<any> {
    let params = JSON.stringify(obj);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this._http.post(this.url + 'list', params, httpOptions);

  }

  udpateList(obj): Observable<any> {
    let params = JSON.stringify(obj);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()
      })
    };
    return this._http.put(this.url + 'list/' + obj._id, params, httpOptions);

  }


  deleteList(token, id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.delete(this.url + 'list/' + id, httpOptions);
  }


}
