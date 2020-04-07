import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NewQuestionComponent } from './new-question/new-question.component';

export const routes: Routes = [
  {path:'', component: HomePageComponent},
  {path: '', component: ToolbarComponent},
  {path: 'new', component: NewQuestionComponent},
  {path:'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
];