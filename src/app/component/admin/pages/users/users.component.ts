import { Component } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {


  ngAfterViewInit(): void {
    // Initialize DataTable after the view has been initialized
    ($ as any)(document).ready(function () {
      ($('#example') as any).DataTable();
    });
  }

}
