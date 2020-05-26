import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
    providedIn: 'root'
  })
export class HomeGuard implements CanActivate{

  user:firebase.User;

  constructor(private authService:AuthService,private router:Router,private afAuth:AngularFireAuth) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
    this.authService.getLoggerInUser()
    .subscribe(user => {
      this.user = user;
    })
    console.log('1',this.user);
    console.log('2',this.afAuth.auth.currentUser);
    return this.afAuth.auth.currentUser ? true : false;
  }
    
}