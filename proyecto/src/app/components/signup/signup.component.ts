import { EstablishmentService } from './../../services/establishment.service';
import { Establishment } from './../../models/establishment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public establishment: Establishment;
  public errorMessage;


  constructor(
    private _establishmentService: EstablishmentService,
  ) {
    this.establishment = new Establishment("", "", "", "", "", "", "", "", "", "", "", "","","","","","","","","","");
  }

  ngOnInit(): void {
    //console.log(this.establishment)
  }

  onSubmit() {
    //console.log(this.establishment)

    this._establishmentService.register(this.establishment).subscribe(
      result => {
        let establishment = result['establishment'];        
        if (!establishment) {        
          this.errorMessage = result['message'];
        } else {
          this.errorMessage = "El registro se ha realizado correctamente!";        }
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

}
