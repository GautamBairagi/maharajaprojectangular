import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent {


  


  loginForm!:FormGroup;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service:AllService,
    private swet :SweetalertssService,
   
  ){
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
  
  }
  userId:any
  ck: boolean = false;
 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        email: ['',  [Validators.required, Validators.email]],
        password: ['', Validators.required],
        first_name :['',Validators.required ],
        last_name :['', ],
        active :[1],
        group_id :[3],
        profile :['',],
        date_of_birth :['', ],
        date_of_joining :['', ],
        gender :['', ],
        designation :['', ],
        phone :['', Validators.required],
        address :['', ],
       city  :['', ],
        state  :['', ],
        zip_code :['', ],
         country  :['', ],
    });
  
  
}


addclient() {
  if (this.loginForm.invalid) {
      this.ck = true;
      return;
  } else {
      console.log("Patient data", this.loginForm.value);
      this.service.createclients(this.loginForm.value).subscribe({
          next: (res) => {
              console.log("res",res)
              if (res.success) {
                  this.router.navigate(['/Admin/Clients'])
              }
          },
          error: (err) => {
              console.log(err);
          }
      });
  }
}

cancel(){
  this.router.navigate(['/Admin/Clients'])
}

}
