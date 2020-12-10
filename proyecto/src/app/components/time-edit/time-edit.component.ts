import { Establishment } from 'src/app/models/establishment';
import { EstablishmentService } from './../../services/establishment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-edit',
  templateUrl: './time-edit.component.html',
  styleUrls: ['./time-edit.component.css']
})
export class TimeEditComponent implements OnInit {

  public identity;
  public token;
  public establishment: Establishment;
  public alertMessage;

  constructor(
    private _establishmentService: EstablishmentService,
  ) {
    this.establishment = new Establishment("", "", "", "", "", "", "", "", "", "", "", "","","","","","","","","","");


    this.identity = this._establishmentService.getIdentity();
    this.establishment = this.identity;
    this.token = this._establishmentService.getToken();
  }
  ngOnInit(): void {
    this.getEstablishment();
  }


  public onSubmit() {

    this._establishmentService.update(this.establishment, this.identity._id).subscribe(
      response => {

        if (!response.establishment) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.getEstablishment();
          this.alertMessage = "Tus datos se ha guardado correctamente";

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


  getEstablishment(){
    this._establishmentService.getUser(this.identity._id).subscribe(
      response => {

        if (!response.establishment) {
          this.alertMessage = "Error en el servidor";
        } else {


          this.establishment = response.establishment;
          //actualizo el localstorage
          let identity =response.establishment
          localStorage.setItem('identity', JSON.stringify(identity));

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
