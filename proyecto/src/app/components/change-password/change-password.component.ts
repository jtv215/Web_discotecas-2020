import { EstablishmentService } from './../../services/establishment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form = new FormGroup({
    passwordCurrent: new FormControl('', Validators.required),
    password1: new FormControl('', 
     [Validators.required
    //, Validators.minLength(6)
  ]
    ),
    password2: new FormControl('', 
     [Validators.required
    //, Validators.minLength(6)
  ]
    )
  });

  public hide = true;
  public hidePassword1 = true;
  public hidePassword2 = true;
  public identity;
  public alertMessage;


  constructor(
    private _establishmentService: EstablishmentService
  ) {
    this.identity = _establishmentService.getIdentity();
  }

  ngOnInit(): void {
  }


  onSubmit() {
    let object = this.form.value;
    this._establishmentService.changePassword(object, this.identity._id).subscribe(
      response => {
        this.alertMessage = response.message;
        this.form.reset();
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
