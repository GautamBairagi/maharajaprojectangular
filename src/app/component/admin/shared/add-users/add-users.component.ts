import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {



  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService,

  ) {
    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
  }
  userId: any
  ck: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['',],
      active: [1],
      group_id: [2],
      profile: ['',],
      date_of_birth: ['',],
      date_of_joining: ['',],
      gender: ['',],
      designation: ['',],
      phone: ['', Validators.required],
    });
  }

    addusers() {
    this.loginForm.value.profile = this.url;

  if (this.loginForm.invalid) {
    this.ck = true;
    return;
  } else {
    console.log("Patient data", this.loginForm.value);
    this.service.createusersadmin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log("res", res)
        if (res.success) {
          this.router.navigate(['/Admin/Users'])
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

cancel(){
  this.router.navigate(['/Admin/Users'])
}


url:any;






// onSelectFile(event: any) {
   

//   let file = event.target.files[0];
//   console.log('hello', file);
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => {
//     this.url = reader.result;
//     console.log('lo', this.url);
//     this.loginForm.value.profile = reader.result;
//   };
//   if (event.target.files && event.target.files[0]) {
//     if (
//       event.target.files[0].type === 'image/jpeg' ||
//       event.target.files[0].type === 'image/png' ||
//       event.target.files[0].type === 'image/jpg' ||
//       event.target.files[0].type === 'application/pdf' ||
//       event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     ) {
//       if (event.target.files[0].size < 200 * 200) {
//         / Checking height  width*/
//       }
//       if (event.target.files[0].size < 20000) {
//         / checking size here - 2MB /
//       }
//     }
//   }
// }



onSelectFile(event: any) {
  const file = event.target.files?.[0]; // Safely access the file
  if (!file) {
      console.error("No file selected");
      return;
  }

  console.log("Selected file:", file);

  const reader = new FileReader();
  reader.onload = () => {
      this.url = reader.result;
      console.log("File content as Base64:", this.url);
      this.loginForm.patchValue({ profile: this.url }); // Use patchValue to update form control
  };
  reader.onerror = (error) => {
      console.error("Error reading file:", error);
  };

  reader.readAsDataURL(file);
}
}
