import { ActivatedRoute, Params } from '@angular/router';
import { ListSong } from 'src/app/models/listsong';
import { SongService } from './../../services/song.service';
import { AlertMenssageComponent } from './../alert-menssage/alert-menssage.component';
import { MatSnackBar } from '@angular/material';
import { SongAddComponent } from './../song-add/song-add.component';
import { ListService } from './../../services/list.service';
import { Subject } from 'rxjs';
import { ListSongService } from './../../services/listsong.service';
import { GLOBAL } from './../../services/global';
import { Song } from './../../models/song';
import { Component, OnInit } from '@angular/core';
import { EstablishmentService } from './../../services/establishment.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  public identity;
  public url: string;
  public song: Song;
  public token;
  public id;
  public showOption;
  public listSong: ListSong[];
  public idList;
  public title;
  public position = 0;
  public mode = null;  //mode 1: reproducción normal;// modo 2: reproducción con voto
  public isList;

  state: Subject<boolean> = new Subject<boolean>();
  private subscription: Subscription

  constructor(
    private _listService: ListService,
    private _listSongService: ListSongService,
    private _establishmentService: EstablishmentService,
    private _snackBar: MatSnackBar,
    private _songService: SongService,
    private route: ActivatedRoute
  ) {
    this.url = GLOBAL.url;
    this.identity = _establishmentService.getIdentity();
    this.token = this._establishmentService.getToken();
  }

  ngOnInit(): void {
    this.downloadSong();
  }

  downloadSong(){
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      if (this.id == null) {
        this.getSongstheEstablishment();
      }
      if (this.id != null) {
        this.showOption = true;
        this.idList = this.id;
        this.getListAndSongs();
      }
    });

  }

  getListAndSongs() {
    this._listService.getListAndSongs(this.idList).subscribe(
      response => {
        if (!response.listSong) {
          // this.alertMessage = "Error en el servidor222";
        } else {
          this.listSong = response.listSong;
          if (this.listSong.length == 0) {
            document.getElementById('box-songs-list').style.display = 'none';
          }
          if (this.listSong.length != 0) {
            document.getElementById('box-songs-list').style.display = 'block';
            this.playAll();
          }
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          // this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );
  }

  onDelete(id) {
    this._listSongService.deleteListSong(this.token, id).subscribe(
      response => {
        if (!response.listSong) {
          alert("Error al borrar mensaje");
        } else {
          this.getListAndSongs();
          let message = "¡La canción se ha eliminado!";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });
        }
      }
    );
  }

  getSongstheEstablishment() {
    this._songService.getSongs(this.identity._id, this.token).subscribe(
      response => {
        let songs: Song[];
        this.listSong = new Array<ListSong>();

        let index = 0;
        for (let song of response['song']) {
          let listSongAux = new ListSong(null, null);
          let aux: Song = response['song'][index];

          listSongAux.song = aux;
          this.listSong.push(listSongAux);
          index++;
        }
        this.playAll();
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          console.log(error);
        }
      }
    );
  }







  modoVotar() {
    // this.mode = '2';
    document.getElementById('box-songs-list').style.background = '#b8b6b6ab';

    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      if (this.id == null) {
        this.isList = 'no';
        this.getSongsWithMaxPoints();
      }
      if (this.id != null) {
        this.showOption = true;
        this.idList = this.id;
        this.isList = 'yes';
        this.getListSongsWithMaxPoints();
      }

    });

  }

  getListSongsWithMaxPoints() {
    this._listSongService.getListSongsWithMaxPoints(this.idList, this.token).subscribe(
      response => {
        let songs: Song[];
        this.listSong = new Array<ListSong>();

        let index = 0;
        for (let song of response['songs']) {
          let listSongAux = new ListSong(null, null);
          let aux: Song = response['songs'][index];

          listSongAux.song = aux;
          this.listSong.push(listSongAux);
          index++;
        }
        this.playAllmodeVotar();
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          console.log(error);
        }
      }
    );



  }


  getSongsWithMaxPoints() {

    this._songService.getSongsWithMaxPoints(this.identity._id, this.token).subscribe(
      response => {
        let songs: Song[];
        this.listSong = new Array<ListSong>();

        let index = 0;
        for (let song of response['song']) {
          let listSongAux = new ListSong(null, null);
          let aux: Song = response['song'][index];

          listSongAux.song = aux;
          this.listSong.push(listSongAux);
          index++;
        }
        this.playAllmodeVotar();
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          console.log(error);
        }
      }
    );

  }


  /******************** Funciones del video*************************************************************************/
  playAll() {
    document.getElementById('box-songs-list').style.background = 'none';

    //compruebo si estoy em modo 2, paso a modo normal 
    if (this.mode == 2) {
      this.route.params.forEach((params: Params) => {
        this.id = params['id'];
        if (this.id == null) {
          this.getSongstheEstablishment();
        }
        if (this.id != null) {
          this.showOption = true;
          this.idList = this.id;
          this.getListAndSongs();
        }

      });
    }

    this.mode = 1;
    let song = this.listSong[0];
    this.startPlayer(song);
  }

  playAllmodeVotar() {
    // document.getElementById('box-songs-list').style.background = 'none';
    this.mode = 2;
    let song = this.listSong[0];
    this.startPlayer(song);
  }



  selectSong(song) {
    this.mode = 1;
    this.startPlayer(song)
  }


  startPlayer(song) {

    if (this.mode == 1) {
      this.position = this.listSong.indexOf(song);
      if (this.position == -1) {
        //console.log('se ha terminado');
      } else {
        let song_player = JSON.stringify(song.song);
        localStorage.setItem('sound_song', song_player);
        let file_path = this.url + 'get-file-song/' + song.song.file;

        document.getElementById("source.reproductor").setAttribute("src", file_path);

        //son metodos del reproductor para cargar la cancion
        (document.getElementById("player-reproductor") as any).load();
        (document.getElementById("player-reproductor") as any).play();

        this.title = (this.position + 1) + ". " + song.song.title;
      }
    }

    if (this.mode == 2) {
      this.position = this.listSong.indexOf(song);
      if (this.position == -1) {
        //console.log('se ha terminado');
      } else {
        let song_player = JSON.stringify(song.song);
        localStorage.setItem('sound_song', song_player);
        let file_path = this.url + 'get-file-song/' + song.song.file;

        document.getElementById("source.reproductor").setAttribute("src", file_path);

        //son metodos del reproductor para cargar la cancion
        (document.getElementById("player-reproductor") as any).load();
        (document.getElementById("player-reproductor") as any).play();

        this.title = (this.position + 1) + ". " + song.song.title;
      }
    }

  }

  videoEnd() {
    if (this.mode == 1) {
      this.startPlayer(this.listSong[this.position + 1]);
    }

    if (this.mode == 2) {
      if (this.isList == 'no') {
        var listSong = this.listSong[this.position];
        var idsong = listSong.song['_id'];

        var options = {
          'id': idsong,
          'number': this.identity.duration,
          'time': this.identity.time
        }
       // console.log(options);
        this.disableAndResetSong(options);
      }

      if (this.isList == 'yes') {
        var listSong = this.listSong[this.position];
        var idsong = listSong.song['_id'];

        var options = {
          'id': idsong,
          'number': this.identity.duration,
          'time':  this.identity.time
        }
        this.disableAndResetSong(options);
      }
    }
  }

  resetSongs(){
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];  
  
      let options=
      {
        'establishmentId': this.identity._id,
        'listSongId':this.id
      };

      this._songService.resetSongs(this.token, options).subscribe(
        response => {
          this.downloadSong();
        },
        error => {
          var errMenssage = <any>error;
          if (errMenssage != null) {
            console.log(error);
          }
        }
      );
    });
  }

  disableAndResetSong(options) {
    this._songService.disableAndResetSong(this.token, options).subscribe(
      response => {
        if (this.isList == 'no') {
          this.getSongsWithMaxPoints();
        }

        if (this.isList == 'yes') {
          this.getListSongsWithMaxPoints();
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          console.log(error);
        }
      }
    );
  }




  playReproducir() {
    (document.getElementById("player-reproductor") as any).play();
  }

  nextSong() {
    let aux = this.listSong.indexOf(this.listSong[this.position + 1]);
    if (aux == -1) {
      this.startPlayer(this.listSong[0]);
    } else {
      this.startPlayer(this.listSong[this.position + 1]);
    }
  }

  backSong() {
    let aux = this.listSong.indexOf(this.listSong[this.position - 1]);
    if (aux == -1) {
      this.startPlayer(this.listSong[this.listSong.length - 1]);

    } else {
      this.startPlayer(this.listSong[this.position - 1]);
    }
  }

  advance() {
    (document.getElementById("player-reproductor") as any).currentTime += 15;
  }

  turnBack() {
    (document.getElementById("player-reproductor") as any).currentTime -= 15;
  }

  pause() {
    (document.getElementById("player-reproductor") as any).pause();
  }

  volumeDonwn() {
    (document.getElementById("player-reproductor") as any).volume -= 0.2;
  }



}