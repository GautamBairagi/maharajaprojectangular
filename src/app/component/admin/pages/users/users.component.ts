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
    // password: [''],
    first_name :['' ],
    last_name :['', ],
    // active :[1],
    // group_id :[2],
    // profile :['',],
    date_of_birth :['', ],
    date_of_joining :['', ],
    // gender :['', ],
    designation :['', ],
    phone :[''],
  })
}

userId:any
ck: boolean = false;

  ngOnInit(): void {
    this.getusersdatas();

  //   this.loginForm = this.fb.group({
  //     email: ['',  [Validators.required, Validators.email]],
  //     password: ['', Validators.required],
  //     first_name :['' ],
  //     last_name :['', ],
  //     active :[1],
  //     group_id :[2],
  //     profile :['',],
  //     date_of_birth :['', ],
  //     date_of_joining :['', ],
  //     gender :['', ],
  //     designation :['', ],
  //     phone :['', Validators.required],
  // });
  }
  getusersData:any= []
  getusersdatas() {
    this.service.getUsersdata().subscribe({
      next: (res: any) => {
        this.getusersData = res;
        // console.log("console get",this.getusersData);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
onclick(){
  this.router.navigate(['/Admin/addusers'])
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

  updateusers() {
    this.service.userupdatedss(this.id, this.userByIdData).subscribe((res: any) => {
      console.log('Nurse updated successfully', res);
      this.swet.SucessToast(`Alottement Updated Successfully`);
      window.location.reload()
    }, (error) => {
      console.error('Error updating user', error);
      // Handle error
    });
  }


  



}


 
