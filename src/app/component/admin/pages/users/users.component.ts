import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import {Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

// declare var $: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit  {
constructor(
  private service:AllService
){}

  ngOnInit(): void {
    this.getusersdatas();
  }
  // ngAfterViewInit(): void {
  //   ($ as any)(document).ready(function () {
  //     ($('#example') as any).DataTable();
  //   });
  // }


  getusersData:any= []
  getusersdatas() {
    this.service.getUsersdata().subscribe({
      next: (res: any) => {
        this.getusersData = res;
        console.log("console get",this.getusersData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}













 
