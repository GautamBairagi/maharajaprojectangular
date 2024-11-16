import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit  {
  // loginForm!:FormGroup;
  updateForm!:FormGroup;
constructor(
  private service:AllService,
  private router:Router,
  private fb: FormBuilder,
  private swet :SweetalertssService,
){
  const userIdString = localStorage.getItem('userId');
  this.userId = userIdString ? parseInt(userIdString, 10) : null;


  this.updateForm = this.fb.group({
    email: [''],
    first_name :['' ],
    last_name :['', ],
    date_of_birth :['', ],
    date_of_joining :['', ],
    designation :['', ],
    phone :[''],
  })
}

userId:any
ck: boolean = false;

dataSend: any

  ngOnInit(): void {
    this.getusersdatas();
    // this.usergetbyid();
  }
  getusersData:any= []
  getusersdatas() {
    this.service.getUsersdata().subscribe({
      next: (res: any) => {
        this.getusersData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
onclick(){
  this.router.navigate(['/Admin/addusers'])
}

userprofile(){
  this.router.navigate(['/Admin/Userdetails'])
}






id:any;
userByIdData:any=[];
  ById(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.userByIdData = res[0];
      console.log("policy by id", this.userByIdData)
    })
  }



  // usergetbyid() {
  //   this.id = data
  //   console.log("user id", this.id)
  //   this.service.roomsgetbyuseridss(this.id).subscribe((res: any) => {
  //     this.userByIdData = res[0];
  //     console.log("policy by id", this.userByIdData)
  //   })
  // }

  



  updateusers() {
    this.service.userupdatedss(this.id, this.userByIdData).subscribe((res: any) => {
      console.log('Nurse updated successfully', res);
      this.swet.SucessToast(`Alottement Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
    });
  }

  updatestatuser() {
    this.service.Userstatusupdatess(this.id, this.userByIdData).subscribe((res: any) => {
      console.log('Nurse updated successfully', res);
      this.swet.SucessToast(`Alottement Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
    });
  }


  toggleVerified(data: any) {
    var id = data.id;
    this.dataSend = {
      active: !data.active // Toggle between true and false
    };
  
    this.service.Userstatusupdatess(id, this.dataSend).subscribe(res => {
      if (res) {
        this.getusersdatas();
        const accountStatus = res.active;
        const doctorName = res.name;
        if (accountStatus) {
          this.swet.SucessToast(` Action done Successfully`);
        } else {
          this.swet.SucessToast(`${doctorName} Lead Action Sccessfully`);
        }
      }
    });
  }



  

//   url:any;
// driverAbst == is a key


// driverDetailsUpdate(){
//     this.updateDetails.value.driverAbst = this.url;
//     this.api.updateDriverDetails(this.updateDetails.value).subscribe((res:any)=>{
//       window.location.reload();
//       console.log(res);
//     })
//   }
//   isImage(url: string): boolean {
//     const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//     return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
// }

  

}


 
