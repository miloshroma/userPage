import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
    providedIn: 'root'
  })
export class HomeGuard implements CanActivate{


 
    constructor(private authSevice:AuthService,private router:Router,private afAuth:AngularFireAuth) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot   ) : Observable<boolean> | boolean{

      console.log('+',this.afAuth.auth.currentUser);
      if (this.afAuth.auth.currentUser){
        return true;
      }
      else if(this.afAuth.auth.currentUser) {
        return false;
      }
    }
    
  
}