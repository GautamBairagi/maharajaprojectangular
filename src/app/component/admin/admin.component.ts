import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service:AllService,
    private swet :SweetalertssService,
  ){}
  ck: boolean = false;

  ngOnInit(): void {
    this.getsidebarsdata();
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




getsidebarsdata(){
      this.service.getsidebarmenu().subscribe({
          next: (res) => {
              console.log("res sidebar data",res)
          },
          error: (err) => {
              console.log(err);
          }
      });

}

// getsidebarsdata() {
//   this.service.getsidebarmenu().subscribe({
//     next: (res) => {
//       const sidebarWithPositionOne = res.find((sidebar: any) => sidebar.position === 1);
//       if (sidebarWithPositionOne) {
//         console.log("Sidebar name with position 1:", sidebarWithPositionOne.side_name);
//       } else {
//         console.log("No sidebar with position 1 found.");
//       }
//     },
//     error: (err) => {
//       console.log("Error fetching sidebar data:", err);
//     }
//   });
// }

// sidebarItems: any[] = [];



  // getsidebarsdata() {
  //   this.service.getsidebarmenu().subscribe({
  //     next: (res) => {
  //       // Sort items by position
  //       this.sidebarItems = res.sort((a: any, b: any) => a.position - b.position);
  //       console.log('this.sidebarItems ',this.sidebarItems )
  //     },
  //     error: (err) => {
  //       console.error("Error fetching sidebar data:", err);
  //     }
  //   });
  // }
}





