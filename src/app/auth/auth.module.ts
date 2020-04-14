import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SingInComponent } from './sing-in/sing-in.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HomeGuard } from '../home.guard';

@NgModule({
  declarations: [SingInComponent, SignUpComponent,],
  imports: [
    CommonModule,
    AuthRoutingModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
      
    ReactiveFormsModule,
    

    HttpClientModule,
  ],
  providers:[
    AuthService,
  ]
})
export class AuthModule { }
