import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './component/admin/pages/home/home.component';
import { UsersComponent } from './component/admin/pages/users/users.component';
import { AddUsersComponent } from './component/admin/shared/add-users/add-users.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [

  {
    path:'',
    component:LandingPageComponent
  },
  {
    path:'mainLogin',
    component:LoginComponent
  },
  
  { path: 'Admin', loadChildren: () => import('./component/admin/admin.module').then(a=>a.AdminModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
