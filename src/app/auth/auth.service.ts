import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

export interface UserData{
  id?: string,
  email: string,
  password: string,
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  error:string = '';

  constructor(private router:Router,private afAuth:AngularFireAuth){}

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }  

  loginFb() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  gitHubAuth(){
    return this.authLogin(new auth.GithubAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((success) => {
        console.log('You have been successfully logged in!')
        this.router.navigateByUrl('');
    }).catch((error) => {
        console.log(error)
    })
  }

  logout(){
    return this.afAuth.auth.signOut()
    .then((success) => {
      this.router.navigateByUrl('/auth/sign-in');
    })
    .catch((error)=>{
      console.log('Something is wrong:', error.message);
    });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed up!', res);
        this.router.navigateByUrl('');
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
        this.error = error;
      });    
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      // .then(res => {
      //   console.log('Successfully signed in!');
      //   this.router.navigateByUrl('/');
      // })
      // .catch(err => {
      //   console.log('Something is wrong:',err.message);
      // });
  }

  getLoggerInUser() {
    return this.afAuth.authState;
  }
}
