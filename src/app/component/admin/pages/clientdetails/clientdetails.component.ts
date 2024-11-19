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
    this.getuserstaskdatas();
    this.getTasksOFUsers()
    this.getmedicinesusers()
    this.getssmilestone()


    const clientData = this.service.getclientData();
    this.allData = clientData
    console.log("Received client data:", clientData);
  }

  getusertaskdataData:any= []
  routinelength:any
  getuserstaskdatas(): void {
    this.service.getroutines().subscribe({
      next: (res: any) => {
        this.getusertaskdataData = res; 
        this.routinelength = res.length; 

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  tasklength:any;
  getTasksOFUserss:any= []
  getTasksOFUsers(): void {
    this.service.getTasksOFRoom().subscribe({
      next: (res: any) => {
        this.getTasksOFUserss = res; 
        this.tasklength = res.length; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  getmedicinesUser:any= []
  medeslength:any;
  getmedicinesusers(): void {
    this.service.getmedicines().subscribe({
      next: (res: any) => {
        this.getmedicinesUser = res; 
        this.medeslength = res.length; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  

  onclick(){
    this.route.navigate(['/Admin/addusers'])
  }
  

  mildstonelength:any
  getmildstonedata:any = [];
  getssmilestone(): void {
    this.service.gertmilestoness().subscribe({
      next: (res: any) => {
        this.getmildstonedata = res; 
        this.mildstonelength = res.length; 
        
        
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
  openRoutineTab() {
    const tabButton = document.getElementById('nav-home-tab'); 
    if (tabButton) {
      tabButton.click(); 
    }
  }    

  openmedsTab() {
    const tabButton = document.getElementById('nav-contact-tab'); 
    if (tabButton) {
      tabButton.click(); 
    }
  }  opentaskTab() {
    const tabButton = document.getElementById('nav-profile-tab'); 
    if (tabButton) {
      tabButton.click(); 
    }
  }  openmildstoneTab() {
    const tabButton = document.getElementById('nav-mildstone-tab'); 
    if (tabButton) {
      tabButton.click(); 
    }
  }
  
  

}
