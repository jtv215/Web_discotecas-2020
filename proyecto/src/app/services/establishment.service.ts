import { Establishment } from './../models/establishment';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {
  public url: string;
  public identity;
  public token;

  public subject$ = new Subject<any>();



  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }

  loggedIn() {
    //devuelve true si contiene token o falso
    return !!localStorage.getItem('token');
  }
  
  sendLoginObservable(establishment: Establishment){
    this.subject$.next({establishment});
  }

  getLoginObservable(): Observable<any> {
    return this.subject$.asObservable();
}



  login(user, gethash = null): Observable<any> {
    if (gethash != null) {
      user.gethash = gethash;
    }
    let json = JSON.stringify(user);
    let params = json;

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'     
      })
    };
    return this._http.post(this.url + 'login', params, httpOptions);
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

  register(user): Observable<any> {
    let params = JSON.stringify(user);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'     
      })
    };
    return this._http.post(this.url + 'register', params, httpOptions);

  }

  update(user,id): Observable<any> {
    let params = JSON.stringify(user);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()   
      })
    };
    return this._http.put(this.url + 'update-establishment/'+id, params, httpOptions);

  }

  changePassword(object,id): Observable<any> {
    let params = JSON.stringify(object);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()   
      })
    };
    return this._http.put(this.url + 'change-password/'+id, params, httpOptions);

  }

  getUser(id): Observable<any> {
   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': this.getToken()   
      })
    };
    return this._http.get(this.url + 'establishment/'+id, httpOptions);

  }

}
