import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { HomeGuard } from './home.guard';
import { FullQuestionComponent } from './question/full-question/full-question.component';
import { EditQuestionComponent } from './question/edit-question/edit-question.component';

export const routes: Routes = [
  {path:'', component: HomePageComponent, canActivate: [HomeGuard]},
  {path: 'new', component: NewQuestionComponent},
  {path: 'full/:id', component: FullQuestionComponent},
  {path: 'edit',component: EditQuestionComponent },
  {path:'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)},
];