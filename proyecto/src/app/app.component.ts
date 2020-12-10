import { List } from './models/list';
import { ListService } from './services/list.service';
import { MatSidenavModule, MatSidenav } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { EstablishmentService } from './services/establishment.service';
import { Establishment } from './models/establishment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public identity;
  public token;
  public establishment: Establishment;
  public errorMessage;
  private subscription: Subscription;
  //public estado;
  public lists: List[]

  state: Subject<boolean> = new Subject<boolean>();



  constructor(
    private _establishmentService: EstablishmentService,
    private _router: Router,
    private _listService: ListService,


  ) {
    this.establishment = new Establishment("", "", "", "", "", "", "", "", "", "", "", "","","","","","","","","","");
    //this.lists = new List("","","");
    //location.reload();

    this.identity = this._establishmentService.getIdentity();
    this.token = this._establishmentService.getToken();
    //this.getLists();


    // this.estado = "1";
  }
  public isCollapsed: boolean = false;


  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {

    this.subscription = this._establishmentService.getLoginObservable().subscribe(
      mensaje => {
        this.identity = mensaje.establishment;

        setTimeout(() => {
          this.getLists();
      }, 1000);

      }
    );





  }


  logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear()
    this.identity = null;
    this.token = null;   
   this._router.navigate(['/entrar']);
  
  setTimeout(() => {
    window.location.reload();
  }, 100); 

  }


  getLists() {
    console.log('se llama a la list');
    console.log(this.identity._id);
    console.log(this.token);
    this._listService.getLists(this.identity._id).subscribe(
      response => {
        if (!response.lists) {
          // this.alertMessage = "Error en el servidor222";
        } else {
          this.lists = response.lists;
        }
      },
      error => {
        var errMenssage = <any>error;
        if (errMenssage != null) {
          //this.alertMessage = error.error.message;
          console.log(error);
        }
      }
    );

  }

  goPlay(list) {
    let idList = list["_id"];
    this._router.navigate(['/play/',idList]);
  }

  goReproductor() {
    this._router.navigate(['/reproductor']);
  }



}



