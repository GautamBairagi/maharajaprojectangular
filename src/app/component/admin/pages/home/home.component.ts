import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service:AllService,
    private swet :SweetalertssService,
   
  ){
   
  }

  ck: boolean = false;
 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
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
              console.log("res",res)
              if (res.success) {
                  this.router.navigate(['home'])
              }
          },
          error: (err) => {
              console.log(err);
          }
      });
  }
}


  logouts() {
    localStorage.removeItem('userId');
    localStorage.removeItem('group_id');
    localStorage.removeItem('group_name');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.router.navigateByUrl("/", { replaceUrl: true })
}


}
