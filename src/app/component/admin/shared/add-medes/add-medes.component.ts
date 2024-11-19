
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-add-medes',
  templateUrl: './add-medes.component.html',
  styleUrls: ['./add-medes.component.css']
})
export class AddMedesComponent {


  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService,

  ) {

    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;
    const clientIdString = localStorage.getItem('clientid');
    this.clientid = clientIdString ? parseInt(clientIdString, 10) : null;
  }
  userId:any
  clientid: any
  ck: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user_id:[this.userId],
      room_id: ['106'],
      client_id: [this.clientid],
      title: ['',],
      description: ['',],
      status: ['',]
    });
  }

  addusers() {
    if (this.loginForm.invalid) {
      this.ck = true;
      return;
    } else {
      console.log("Patient data", this.loginForm.value);
      
      this.service.createmilestones(this.loginForm.value).subscribe({
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

  cancel() {
    this.router.navigate(['/Admin/Users'])
  }
  url: any;

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
