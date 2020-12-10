import { ListSong } from './../models/listsong';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListSongService {
  public url: string;
  public identity;
  public token;
  public subject$ = new Subject<any>();

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }


  getListSongsWithMaxPoints(id, token): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };
    
    return this._http.get(this.url + 'max-points-list-song/' + id, httpOptions);
  }


  addSongtoPlaylist(token, obj): Observable<any> {
    let params = JSON.stringify(obj);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };

    return this._http.post(this.url + 'listsong', params, httpOptions);
  }


  deleteListSong(token, id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.delete(this.url + 'listsong/' + id, httpOptions);
  }




}
