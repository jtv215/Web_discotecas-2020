import { EstablishmentService } from './services/establishment.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }


  constructor(
    private _establishmentService: EstablishmentService,
    private _router:Router
    ){}


  canActivate():boolean{
    if (this._establishmentService.loggedIn()){
      return true;
    }

    this._router.navigate(['/entrar']);
    return false;

  }
  
}
