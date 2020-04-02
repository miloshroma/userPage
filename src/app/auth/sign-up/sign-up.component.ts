import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserData } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  form:FormGroup;
  user: firebase.User;

  constructor(private formBuilder: FormBuilder,
    public authService:AuthService,
    private router:Router,
    private auth:AngularFireAuth ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[
        Validators.required, Validators.email
       ]],
      password: ['',[
        Validators.required
       ]],
    });    

    this.authService.getLoggerInUser().subscribe(user => {
      this.user = user;
    })
  }

  validationFormControl(controlName: string): boolean {
    const control = this.form.controls[controlName];
    
     const result = control.invalid && control.touched;
    
     return result;
    }
  
  register(){
    const controls = this.form.controls;

    if (this.form.invalid) {
      Object.keys(controls)
    .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    const data: UserData = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    }

    this.authService.signUp(data.email,data.password);
   }

   
  loginGoogle() {
    this.authService.googleAuth();
  }

  loginFb(){
    this.authService.loginFb();
  }

  loginGitHub(){
    this.authService.gitHubAuth();
  }
  
}
