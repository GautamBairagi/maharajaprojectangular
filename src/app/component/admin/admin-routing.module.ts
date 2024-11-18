import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './shared/add-users/add-users.component';
import { SidebarSettingComponent } from './pages/sidebar-setting/sidebar-setting.component';
import { UserGroupPermissionComponent } from './pages/setting/user-group-permission/user-group-permission.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';
import { UserdetailsComponent } from './pages/userdetails/userdetails.component';
import { ClientviewComponent } from './pages/clientview/clientview.component';
import { AddclientComponent } from './shared/addclient/addclient.component';
import { ClientdetailsComponent } from './pages/clientdetails/clientdetails.component';

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
      {
        path:'Projects',
        component:RoomsComponent
      },
      {
        path:'room-details',
        component:RoomDetailsComponent,
      },
      {
        path:'Userdetails',
        component:UserdetailsComponent
      },
      {
        path:'Clients',
        component:ClientviewComponent
      }, 
      
      {
        path:'Addclient',
        component:AddclientComponent
      },
      {
        path:'Clientdetails',
        component:ClientdetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
