import { EstablishmentService } from './../../services/establishment.service';
import { Establishment } from './../../models/establishment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit-establecimiento',
  templateUrl: './user-edit-establecimiento.component.html',
  styleUrls: ['./user-edit-establecimiento.component.css']
})
export class UserEditEstablecimientoComponent implements OnInit {

  public identity;
  public token;
  public establishment:Establishment;
  public alertMessage;

  constructor(
    private _establishmentService: EstablishmentService,
    private _router: Router
  ) {
    this.establishment = new Establishment("", "", "", "", "", "", "", "", "", "", "", "","","","","","","","","","");

    this.identity = this._establishmentService.getIdentity();
    this.establishment = this.identity;
    this.token = this._establishmentService.getToken();
  }

  ngOnInit(): void {
  }


  public onSubmit() {
    console.log(this.establishment);

    
    this._establishmentService.update(this.establishment,this.identity._id).subscribe(
      response => {
        console.log(response);

        if (!response.establishment) {
          this.alertMessage = "Error en el servidor";
        } else {
          this.alertMessage = "Los datos del establicimiento se han actualizado correctamente.";
          this.getuser();
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


  getuser(){
    this._establishmentService.getUser(this.identity._id).subscribe(
      response => {
        console.log(response);

        if (!response.establishment) {
          this.alertMessage = "Error en el servidor";
        } else {
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
