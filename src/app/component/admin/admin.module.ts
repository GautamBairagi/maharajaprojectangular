import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './pages/users/users.component';
import { AddUsersComponent } from './shared/add-users/add-users.component';
import { SidebarSettingComponent } from './pages/sidebar-setting/sidebar-setting.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserGroupPermissionComponent } from './pages/setting/user-group-permission/user-group-permission.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { RoomDetailsComponent } from './pages/room-details/room-details.component';



@NgModule({
  declarations: [
    AdminComponent,
    HomeComponent,
    UsersComponent,
    AddUsersComponent,
    SidebarSettingComponent,
    UserGroupPermissionComponent,
    RoomsComponent,
    RoomDetailsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule,
    ColorPickerModule
  ]
})
export class AdminModule { }
