import { AlertMenssageComponent } from './../alert-menssage/alert-menssage.component';
import { UploadService } from './../../services/upload.service';
import { GLOBAL } from './../../services/global';
import { SongService } from './../../services/song.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstablishmentService } from './../../services/establishment.service';
import { Song } from './../../models/song';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css']
})
export class SongAddComponent implements OnInit {
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public filesToUpload: Array<File>;
  public loadedAudio = false;
  public activeVideo = false;
  public file_path;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _establishmentService: EstablishmentService,
    private _songService: SongService,
    private _uploadService: UploadService,
    private _snackBar: MatSnackBar,
  ) {
    this.identity = this._establishmentService.getIdentity();
    this.token = this._establishmentService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song('', '', '', '', '', 0, 0, 0, '', '');
  }

  ngOnInit() {
  }


  onSubmit() {

    this._songService.addSong(this.token, this.song).subscribe(
      response => {
        if (!response.song) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.song = response.song;
          let id = response.song._id;

          if (!this.filesToUpload) {

          } else {
            this.uploadFile(id);
          }

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



  uploadFile(id) {
    let url = this.url + 'upload-file-song/' + id;
    let params = [];
    let name = 'file';
    this._uploadService.makeFileRequest(url, params, this.filesToUpload, this.token, name)
      .then(
        response => {
          this.getSong(id, this.token);
        },
        error => {
          console.log(error);
        }
      );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    let nameSong = this.filesToUpload[0].name;
    var ext_split = nameSong.split('\.');

    this.song.title = ext_split[0];
    this.song.establishment = this.identity._id;
  }


  getSong(id, token) {
    this._songService.getSong(id, token).subscribe(
      response => {
        if (!response.song) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.song = response.song;
          this.getTimevideo(id, token);
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



  getTimevideo(id, token) {
    this.activeVideo = true;
    this.file_path = this.url + 'get-file-song/' + this.song.file;

    setTimeout(() => {
      var aux = (document.getElementById("player-reproductor-add") as any).duration;
      let time = this.secondsToTime(aux);
      this.song.duration = time;

      this.updateSong(id, token);

    }, 1000);
  }



  updateSong(id, token) {
    this._songService.editSong(token, id, this.song).subscribe(
      response => {
        if (!response.song) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.song = response.song;

          let message = "¡La canción se ha subido correctamente!";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 3000,
            data: message
          });

          this.song = new Song('', '', '', '', '', 0, 0, 0, '', '');
          this._router.navigate(['song-list']);
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


  secondsToTime(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return hours + ':' + minutes + ':' + seconds;
  }

}
