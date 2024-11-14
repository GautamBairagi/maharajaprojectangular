import { Component } from '@angular/core';
interface Permission {
  name: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

@Component({
  selector: 'app-user-group-permission',
  templateUrl: './user-group-permission.component.html',
  styleUrls: ['./user-group-permission.component.css']
})
export class UserGroupPermissionComponent {

  memberModules: Permission[] = [
    { name: 'Projects', create: true, read: true, update: true, delete: true },
    { name: 'Statuses', create: true, read: true, update: false, delete: false },
    { name: 'Milestone', create: false, read: true, update: false, delete: false },
    { name: 'Tasks', create: true, read: true, update: true, delete: false },
    { name: 'Calendar', create: false, read: false, update: false, delete: false },
    { name: 'Payslips', create: false, read: false, update: false, delete: false } ,
    { name: 'Chat', create: false, read: false, update: false, delete: false } ,
    { name: 'Users', create: false, read: false, update: false, delete: false },
     { name: 'Clients', create: false, read: false, update: false, delete: false } ,
     { name: 'Leave requests', create: false, read: false, update: false, delete: false },
      { name: 'Notes', create: false, read: false, update: false, delete: false } ,
      { name: 'Announcements', create: false, read: false, update: false, delete: false },
       { name: 'Knowledgebase', create: false, read: false, update: false, delete: false } ,
       { name: 'Meetings', create: false, read: false, update: false, delete: false } ,
       { name: 'Time tracker ', create: false, read: false, update: false, delete: false },
        { name: 'Leads', create: false, read: false, update: false, delete: false },
        { name: 'Todos', create: false, read: false, update: false, delete: false },
        { name: 'Contracts', create: false, read: false, update: false, delete: false },
        { name: 'Upcoming birthdays', create: false, read: false, update: false, delete: false },
        { name: 'Upcoming work anniversaries', create: false, read: false, update: false, delete: false },
        { name: 'Members on leave', create: false, read: false, update: false, delete: false },
    
  ];

  clientModules: Permission[] = [
    { name: 'Projects', create: true, read: true, update: true, delete: true },
    { name: 'Statuses', create: true, read: true, update: false, delete: false },
    { name: 'Milestone', create: false, read: true, update: false, delete: false },
    { name: 'Tasks', create: true, read: true, update: true, delete: false },
    { name: 'Calendar', create: false, read: false, update: false, delete: false },
    { name: 'Payslips', create: false, read: false, update: false, delete: false } ,
    { name: 'Chat', create: false, read: false, update: false, delete: false } ,
    { name: 'Users', create: false, read: false, update: false, delete: false },
     { name: 'Clients', create: false, read: false, update: false, delete: false } ,
     { name: 'Leave requests', create: false, read: false, update: false, delete: false },
      { name: 'Notes', create: false, read: false, update: false, delete: false } ,
      { name: 'Announcements', create: false, read: false, update: false, delete: false },
       { name: 'Knowledgebase', create: false, read: false, update: false, delete: false } ,
       { name: 'Meetings', create: false, read: false, update: false, delete: false } ,
       { name: 'Time tracker ', create: false, read: false, update: false, delete: false },
        { name: 'Leads', create: false, read: false, update: false, delete: false },
        { name: 'Todos', create: false, read: false, update: false, delete: false },
        { name: 'Contracts', create: false, read: false, update: false, delete: false },
        { name: 'Upcoming birthdays', create: false, read: false, update: false, delete: false },
        { name: 'Upcoming work anniversaries', create: false, read: false, update: false, delete: false },
        { name: 'Members on leave', create: false, read: false, update: false, delete: false },
  ];

}
