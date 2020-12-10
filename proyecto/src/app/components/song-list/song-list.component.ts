import { AlertMenssageComponent } from './../alert-menssage/alert-menssage.component';
import { GLOBAL } from './../../services/global';
import { ListSongService } from './../../services/listsong.service';
import { List } from './../../models/list';
import { ListService } from './../../services/list.service';
import { Song } from './../../models/song';
import { SongService } from './../../services/song.service';
import { EstablishmentService } from './../../services/establishment.service';
import { Establishment } from './../../models/establishment';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ListSong } from 'src/app/models/listsong';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent implements OnInit {
  public identity;
  public token;
  public idEstableshment;
  public songs: Song[];
  public lists: List[];
  public alertMessage;
  public url;
  selected = 'option2';
  constructor(
    private _establishmentService: EstablishmentService,
    private _songService: SongService,
    private _listService: ListService,
    private _listSongService: ListSongService,
    private _snackBar:MatSnackBar

  ) {
    this.identity = _establishmentService.getIdentity();
    this.token = _establishmentService.getToken();
    this.idEstableshment = this.identity._id;
    this.url = GLOBAL.url;

    let url = this.url + 'upload-image-song/';

  }

  listData: MatTableDataSource<Establishment>;
displayedColumns: string[] = ['image','title', 'artist', 'cost_song', 'total_votes', 'total_points', 'active_song','duration', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  code: string;

  ngOnInit() {
    this.getSongs();
    this.getLists();
  }

  getSongs() {
    this._songService.getSongs(this.idEstableshment, this.token).subscribe(
      response => {
        this.songs = response.song;
        this.rellenarTabla(this.songs);
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          console.log(error);
        }
      }
    );

  }

  addSongToPlaylist(song_id, list_id) {


    let listsong = new ListSong(list_id, song_id);
    this._listSongService.addSongtoPlaylist(this.token, listsong).subscribe(
      response => {
        //console.log(response);
          let listSong= response.listSong;

        if (!listSong) {
          this.alertMessage = "Error en el servidor";
        } else {
          let message = "Se ha añadido a la lista!";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });
         
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);

        }
      }
    );



  }


  getLists() {

    this._listService.getLists(this.identity._id).subscribe(
      response => {

        if (!response.lists) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.lists = response.lists;
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );

  }



  rellenarTabla(datos) {
    this.listData = new MatTableDataSource(datos);
    this.listData.sort = this.sort;
    this.listData.paginator = this.paginator;
    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        //return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
        return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });
    };
  }



  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }


  onDelete(id) {
    this._songService.deleteSong(this.token, id).subscribe(
      response => {
        this.code = response.song;
        if (!response.song) {
          alert("Error al borrar mensaje")
        } else {
          this.getSongs()
          let message = "¡La canción se ha eliminado!";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });
        }
      }
    );
 
  }

  activeSong(id){

    this._songService.resetSong(this.token,id).subscribe(
      response => {

        if (!response.song) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.getSongs()

          let message = "Se ha activado correctamente!";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );


  }


}
