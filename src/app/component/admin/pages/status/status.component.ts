import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  constructor(
    private service:AllService,
    private swet: SweetalertssService
  ){}
  ngOnInit(): void {
    this.getmedicinesusers()  }
  


  getmedicinesUser:any= []
  medeslength:any;
  getmedicinesusers(): void {
    this.service.getstatus().subscribe({
      next: (res: any) => {
        this.getmedicinesUser = res; 
        console.log('getmedicinesUser',this.getmedicinesUser);
        this.medeslength = res.length; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  dataSend: any
toggleVerified(data: any) {
  var id = data.id;
  this.dataSend = {
    status: !data.status 
  };
  this.service.InstatusStatusupdatess(id, this.dataSend).subscribe(res => {
    if (res) {
      this.getmedicinesusers();
      const accountStatus = res.status;
      const doctorName = res.name;
      if (accountStatus) {
        this.swet.SucessToast(` Action done Successfully`);
      } else {
        this.swet.SucessToast(` Done Action Sccessfully`);
      }
    }
  });
}



id:any;
userByIdData:any=[];
  ById(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getStatusById(data).subscribe((res: any) => {
      this.userByIdData = res[0];
      // this.userprofile()
      this.service.setclientData(this.userByIdData);
      console.log("policy by id", this.userByIdData)
    })
  }


  updateusers() {
    this.service.userupdatedss(this.id, this.userByIdData).subscribe((res: any) => {
      console.log(' updated successfully', res);
      this.swet.SucessToast(`Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
    });
  }


// userpatchmethod

// pupdte method



}
