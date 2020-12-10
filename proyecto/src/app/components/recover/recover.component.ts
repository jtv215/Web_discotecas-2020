import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  public errorMessage;
  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {
    //console.log(this.establishment);

    
    // this._establishmentService.login(this.establishment).subscribe(
    //   result => {

    //     let identity = result['establishment'];
    //     this.identity = identity;
    //     if (!this.identity._id) {
    //       alert("El usuario no está correctamente identificado");
    //     } else {

    //       localStorage.setItem('identity', JSON.stringify(identity));
    //       this._establishmentService.sendLoginObservable(identity);

    //      this.getToken();
    //     }

    //   },
    //   error => {
    //     var errMenssage = <any>error;
    //     if (errMenssage != null) {
    //       this.errorMessage = error.error.message;
    //       console.log(error);

    //     }
    //   }
    // );
  }

}
