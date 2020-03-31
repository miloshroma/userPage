import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

export interface UserData{
  id?: string,
  email: string,
  password: string,
}

// interface RegisterUser{
//   name:string
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  //static url = 'https://user-page-c0a04.firebaseio.com/';
  // constructor(private http: HttpClient) { }
  constructor(private router:Router, private afAuth:AngularFireAuth){}

  login(){
    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  getLoggerInUser() {
    return this.afAuth.authState;
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });    
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
      })
      .catch(err => {
        console.log('Something is wrong:',err.message);
      });
  }

  // register(data: UserData):Observable<UserData>{
  //   return this.http
  //   .post<RegisterUser>(`${AuthService.url}.json`,data)
  //   .pipe(map(responce => {
  //     console.log('Responce:',responce);
  //     return {...data,id:responce.name};
  //   }));
  // } 

  // login():Observable<UserData[]>{
  //   return this.http.get<UserData[]>(`${AuthService.url}.json`)
  //   .pipe(map(tasks => {
  //     if(!tasks){
  //       return [];
  //     }
  //     return Object.keys(tasks).map(key => ({...tasks[key], id:key}));
  //   }))
  // }
}
