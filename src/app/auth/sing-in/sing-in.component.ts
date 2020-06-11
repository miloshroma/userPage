import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserData } from '../auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {

  form:FormGroup;
  
  
  constructor(private formBuilder: FormBuilder,private afAuth:AngularFireAuth,
    private authService:AuthService,
    private router: Router ) {}

  error: string = this.authService.error;
  
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:['',[
        Validators.required, Validators.email
       ]],
      password: ['',[
        Validators.required
       ]],
    });
  }

  validationFormControl(controlName: string): boolean {
    const control = this.form.controls[controlName];
    
     const result = control.invalid && control.touched;
    
     return result;
    }

  login(){
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

    this.authService.signIn(data.email, data.password)
    .then(res => {
      this.router.navigateByUrl('');
    })
    .catch(err => {
      this.error = err.message;
    });
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
