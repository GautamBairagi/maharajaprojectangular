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


}
