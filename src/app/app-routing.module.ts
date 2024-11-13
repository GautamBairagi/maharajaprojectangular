import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './component/admin/pages/home/home.component';
import { UsersComponent } from './component/admin/pages/users/users.component';
import { AddUsersComponent } from './component/admin/shared/add-users/add-users.component';

const routes: Routes = [


  {
    path:'',
    component:LoginComponent
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'viewusers',
    component:UsersComponent
  },
  {
    path:'addusers',
    component:AddUsersComponent
  },
  
  
  { path: 'Admin', loadChildren: () => import('./component/admin/admin.module').then(a=>a.AdminModule) },
  // { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  // { path: 'nurse', loadChildren: () => import('./nurse/nurse.module').then(m => m.NurseModule) }, 
  // { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
