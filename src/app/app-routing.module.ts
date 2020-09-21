import { TutorialComponent } from './tutorial/tutorial.component';
import { AddEditActivitiesComponent } from './components/add-edit-activities/add-edit-activities.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard], data: {animation: 'HomePage'} },
  { path: 'add', component: AddEditActivitiesComponent, canActivate: [AuthGuard], data: {animation: 'AddPage'} },
  { path: 'edit/:id', component: AddEditActivitiesComponent, canActivate: [AuthGuard], data: {animation: 'EditPage'} },
  { path: 'tutorial', component: TutorialComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
