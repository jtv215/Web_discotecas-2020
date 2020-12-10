import { MatSnackBar } from '@angular/material';
import { AlertMenssageComponent } from './../alert-menssage/alert-menssage.component';
import { GLOBAL } from './../../services/global';
import { UploadService } from './../../services/upload.service';
import { SongService } from './../../services/song.service';
import { EstablishmentService } from './../../services/establishment.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Song } from './../../models/song';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-song-edit',
  templateUrl: './song-edit.component.html',
  styleUrls: ['./song-edit.component.css']
})
export class SongEditComponent implements OnInit {
  public song: Song;
  public identity;
  public token;
  public url: string;
  public alertMessage;
  public filesToUpload: Array<File>;
  public loadedAudio = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _establishmentService: EstablishmentService,
    private _songService: SongService,
    private _uploadService: UploadService,
    private _location: Location,
    private _snackBar: MatSnackBar

  ) {
    this.identity = this._establishmentService.getIdentity();
    this.token = this._establishmentService.getToken();
    this.url = GLOBAL.url;
    this.song = new Song('', '', '', '', '', 0, 0, 0, '', '');
  }

  ngOnInit(): void {
    this.getSong()
  }

  getSong() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];
      this._songService.getSong(id, this.token).subscribe(
        response => {
          console.log(response);
          if (!response.song) {
            this.alertMessage = "Error en el servidor";
          } else {
            this.song = response.song;
            /*
            this.urlAudio= this.url+'get-file-song/'+this.song.file;
            this.loadedAudio = true; //need time for load url
            */
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
    });
  }


  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._songService.editSong(this.token, id, this.song).subscribe(
        response => {
          if (!response.song) {
            this.alertMessage = "Error en el servidor";
          } else {
            console.log(response.song);


            //upload image
            if (!this.filesToUpload) {
              let message = "Se han guardado los cambios correctamente";

              this._snackBar.openFromComponent(AlertMenssageComponent, {
                duration: 1500,
                data: message
              });
            } else {
              this.uploadImage(id);
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
    });

  }

  uploadImage(id) {

    let url = this.url + 'upload-image-song/' + id;
    let params = [];
    let name = 'image';
    this._uploadService.makeFileRequest(url, params, this.filesToUpload, this.token, name)
      .then(
        result => {
          console.log(result);
          let message = "Se han guardado los cambios correctamente";
          this._snackBar.openFromComponent(AlertMenssageComponent, {
            duration: 1500,
            data: message
          });

          this.getSong();
        },
        error => {
          this.alertMessage = "por motivos de extension invalida no se ha subido";
          console.log(error);

        }
      );//Fin Service 
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }


  comeBack() {
    this._location.back();
  }



}
