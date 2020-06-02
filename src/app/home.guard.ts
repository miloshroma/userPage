import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from './auth/auth.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class HomeGuard implements CanActivate{

  constructor(private authService:AuthService,private router:Router,private afAuth:AngularFireAuth) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {
    return this.authService.getLoggerInUser().pipe(
      map(user => !!user)
    );
  }
    
}