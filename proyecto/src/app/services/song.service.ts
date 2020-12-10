import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 

@Injectable({
  providedIn: 'root'
})
export class SongService {
  public url: string;
  public identity;
  public token;
  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url;
  }


  
  getSong(id,token): Observable<any> {
   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token   
      })
    };
    return this._http.get(this.url + 'song/'+id, httpOptions);

  }


  getSongs(id,token): Observable<any> {
   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token  
      })
    };
    return this._http.get(this.url + 'songs/'+id, httpOptions);

  }

  getSongsWithMaxPoints(id,token): Observable<any> {
   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token  
      })
    };
    return this._http.get(this.url + 'max-points-songs/'+id, httpOptions);

  }
  
  disableAndResetSong(token,options): Observable<any> {
    let params = JSON.stringify(options);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token  
      })
    };
    return this._http.post(this.url + 'disabled-reset-song',params, httpOptions);

  }
  
  resetSong(token,id): Observable<any> {
    let params = JSON.stringify({'id':id});

   console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token  
      })
    };
    return this._http.post(this.url + 'reset-song', params, httpOptions);

  }

  resetSongs(token,options): Observable<any> {
    let params = JSON.stringify(options);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token  
      })
    };
    return this._http.post(this.url + 'reset-songs',params, httpOptions);

  }

  
  addSong(token, song): Observable<any> {
    let params = JSON.stringify(song);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };

    return this._http.post(this.url + 'song', params, httpOptions);
  }

  editSong(token, id, song): Observable<any> {
    let params = JSON.stringify(song);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };

    return this._http.put(this.url + 'song/' + id, params, httpOptions);
  }

  deleteSong(token, id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': token
      })
    };
    return this._http.delete(this.url + 'song/' + id, httpOptions);
  }


}
