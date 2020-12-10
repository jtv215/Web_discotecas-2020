import { EstablishmentService } from './../../services/establishment.service';
import { Establishment } from './../../models/establishment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
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
    this.token = this._establishmentService.getToken();
  }
  ngOnInit(): void {



  }



}


