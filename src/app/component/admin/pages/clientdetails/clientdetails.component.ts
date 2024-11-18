import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-clientdetails',
  templateUrl: './clientdetails.component.html',
  styleUrls: ['./clientdetails.component.css']
})
export class ClientdetailsComponent {
  constructor(
    private service:AllService,
    private route: Router
  ){}

  allData :any[] = []
  ngOnInit(): void {
    this.getusersdatas();
    this.getTasksOFUsers()
    this.getmedicinesusers()


    const clientData = this.service.getclientData();
    this.allData = clientData
    console.log("Received client data:", clientData);
  }

  getusersData:any= []
  getusersdatas(): void {
    this.service.getroutines().subscribe({
      next: (res: any) => {
        this.getusersData = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  getTasksOFUser:any= []
  getTasksOFUsers(): void {
    this.service.getTasksOFRoom().subscribe({
      next: (res: any) => {
        this.getTasksOFUser = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  getmedicinesuser:any= []
  getmedicinesusers(): void {
    this.service.getmedicines().subscribe({
      next: (res: any) => {
        this.getTasksOFUser = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  

  onclick(){
    this.route.navigate(['/Admin/addusers'])
  }
  

  

}
