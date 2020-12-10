import { Establishment } from './../../models/establishment';
import { EstablishmentService } from './../../services/establishment.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public identity;
  public token;
  public establishment:Establishment;
  public errorMessage;

  constructor(
    private _establishmentService: EstablishmentService,
    private _router: Router
  ) {
    this.establishment = new Establishment("", "", "", "", "", "", "", "", "", "", "", "","","","","","","","","","");

    this.identity = this._establishmentService.getIdentity();
    this.token = this._establishmentService.getToken();
  }

  ngOnInit() {
   
  
  }
  
  public onSubmit() {
    //console.log(this.establishment);

    
    this._establishmentService.login(this.establishment).subscribe(
      result => {

        let identity = result['establishment'];
        this.identity = identity;
        if (!this.identity._id) {
          alert("El usuario no está correctamente identificado");
        } else {

          localStorage.setItem('identity', JSON.stringify(identity));
          this._establishmentService.sendLoginObservable(identity);

         this.getToken();
        }

      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.errorMessage = error.error.message;
          console.log(error);

        }
      }
    );
  }


  
  getToken() {
    this._establishmentService.login(this.establishment, 'true').subscribe(
      result => {

        let token = result['token'];
        this.token = token;
        if (this.token.length <= 0) {
          alert("El token no se ha generado");
        } else {

          localStorage.setItem('token', token);
          this._router.navigate(['/reproductor']);

          this.establishment = new Establishment("", "", "", "", "", "", "", "", "", "", "", "","","","","","","","","","");

        
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          this.errorMessage = error.error.message;

        }
      }
    );
  }
}
