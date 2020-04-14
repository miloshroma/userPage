import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { HomeGuard } from './home.guard';
import { FullQuestionComponent } from './question/full-question/full-question.component';

export const routes: Routes = [
  {path:'', component: HomePageComponent, canActivate: [HomeGuard]},
  {path: 'new', component: NewQuestionComponent},
  {path: 'full', component: FullQuestionComponent},
  {path:'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
];