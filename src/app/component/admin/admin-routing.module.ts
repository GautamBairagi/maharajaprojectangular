import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './shared/add-users/add-users.component';
import { SidebarSettingComponent } from './pages/sidebar-setting/sidebar-setting.component';
import { UserGroupPermissionComponent } from './pages/setting/user-group-permission/user-group-permission.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',
        redirectTo:'Home',
        pathMatch:'full'
      },
      {
        path:'Home',
        component:HomeComponent
      },
      {
        path:'addusers',
        component:AddUsersComponent
      },
      {
        path:'Users',
        component:UsersComponent
      },
      {
        path:'setting',
        component:SidebarSettingComponent
      },
      {
        path:'user_group_permission',
        component:UserGroupPermissionComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
