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
        active :[0],
        group_id :[3],
        profile :[''],
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
  this.loginForm.value.profile = this.url;

      this.service.createclients(this.loginForm.value).subscribe({
          next: (res) => {
              console.log("res",res)
              if (res.success) {
                  // this.router.navigate(['/Admin/Clients'])
              }
          },
          error: (err) => {
              console.log(err);
          }
      });
  }
}

url:any;

onSelectFile(event: any) {
  let file = event.target.files[0];
  console.log('hello', file);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.url = reader.result;
    console.log('lo', this.url);
    this.loginForm.value.profile = reader.result;
  };
  if (event.target.files && event.target.files[0]) {
    if (
      event.target.files[0].type === 'image/jpeg' ||
      event.target.files[0].type === 'image/png' ||
      event.target.files[0].type === 'image/jpg' ||
      event.target.files[0].type === 'application/pdf' ||
      event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      if (event.target.files[0].size < 200 * 200) {
        / Checking height  width*/
      }
      if (event.target.files[0].size < 20000) {
        / checking size here - 2MB /
      }
    }
  }
}

isPDF(url: string): boolean {
  return url.startsWith('data:application/pdf');
}

isExcel(url: string): boolean {
  return url.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
}

isImage(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
}


cancel(){
  this.router.navigate(['/Admin/Clients'])
}

}
