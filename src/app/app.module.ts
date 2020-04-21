import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import {routes} from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HomeGuard } from './home.guard';
import { HttpClientModule } from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import { FullQuestionComponent } from './question/full-question/full-question.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ToolbarComponent,
    NewQuestionComponent,
    FullQuestionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,

    ReactiveFormsModule,
    

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,  
    AngularFireDatabaseModule,   

    RouterModule.forRoot(routes),

  ],
  providers:[HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
