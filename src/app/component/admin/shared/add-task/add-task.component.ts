
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {

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
  userId: any
  clientid: any
  ck: boolean = false;
  allData:any;


  ngOnInit(): void {
    this.getssmilestone()
    this.getmedicinesusers()
    this.allactiveststusss()
    this.units()
    // this.timesss()

    this.frequencysss()
    this.loginForm = this.fb.group({
      allotted_to: [this.clientid],
      description: ['',],
      due_date: ['', Validators.required],
      milestone_id: ['',],
      name: ['',],
      priority: ['',],
      project_id: [], 
      start_date: ['', [Validators.required, this.noPastDateValidator]],
      status: ['',],
      task_message: ['',], 
      user_id: [this.userId],
      medicine_id: new FormControl([],Validators.required),
      comment_count: [''],  
      frequency: [''],  
      unit: [''],  
    });

    const clientData = this.service.getclientData();
    this.allData = clientData;
    const client_room_number= clientData[0].room_number
    console.log("in mildstone client data:", clientData);
    console.log("in mildstone client allData:", client_room_number);
    this.loginForm.patchValue({ project_id: client_room_number });
    this.loginForm.get('start_date')?.valueChanges.subscribe((startDate) => {
      this.updateDueDateValidator(startDate);
    });

  }



  noPastDateValidator(control: any) {
    const currentDate = new Date().toISOString().split('T')[0]; 
    if (control.value && control.value < currentDate) {
      return { noPastDate: true }; 
    }
    return null; 
  }

 
  updateDueDateValidator(startDate: string) {
    const dueDateControl = this.loginForm.get('due_date');
    if (dueDateControl) {
      dueDateControl.setValidators([
        Validators.required,
        (control) => {
          if (control.value && control.value < startDate) {
            return { dueDateInvalid: true }; 
          }
          return null; 
        }
      ]);
      dueDateControl.updateValueAndValidity(); 
    }
  }

  // addtask() {
  //   if (this.loginForm.invalid) {
  //     this.ck = true;
  //     return;
  //   } else {
  //     console.log("Patient data", this.loginForm.value);
  //     this.service.postTaskFromRoom(this.loginForm.value).subscribe({
  //       next: (res) => {
  //         console.log("res", res)
  //         if (res.success) {
  //           this.router.navigate(['/Admin/Clientdetails'])
  //         }
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     });
  //   }
  // }
  submitRoom(){
    const formValue = this.loginForm.value;
  const userIds = Array.isArray(formValue.medicine_id) ? formValue.medicine_id : formValue.medicine_id.split(',');
  const formData = {
    ...formValue,
    medicine_id: userIds.join(','), 
  };
    console.log(formData);
       this.service.postTaskFromRoom(formData).subscribe((response) => {
        console.log('Room created successfully', response);
        this.router.navigate(['/Admin/Clientdetails'])
      });
  }
  cancel() {
    this.router.navigate(['/Admin/Clientdetails'])
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
  getmildstonedata:any = [];
  getssmilestone(): void {
    this.service.getmildstonebyclientID(this.clientid).subscribe({
      next: (res: any) => {
        this.getmildstonedata = res;  
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getmedicinesUser:any= []
  getmedicinesusers(): void {
    this.service.getmedicines().subscribe({
      next: (res: any) => {
        this.getmedicinesUser = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  selectedUsers: any[] = [];
  toggleSelection(user: any): void {
    const userIdsControl = this.loginForm.get('medicine_id');
    const index = this.selectedUsers.findIndex((u) => u.id === user.id);
    if (index > -1) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(user);
    }
    userIdsControl?.setValue(this.selectedUsers.map((u) => u.id));
  }
  isUserSelected(user: any): boolean {
    return this.selectedUsers.some((u) => u.id === user.id);
  }


  allactiveststussss:any=[]
  allactiveststusss(): void {
    this.service.allactiveststuss().subscribe({
      next: (res: any) => {
        this.allactiveststussss = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  
  frequencyssss:any=[]
  frequencysss(): void {
    this.service.frequencyss().subscribe({
      next: (res: any) => {
        this.frequencyssss = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  unitss:any=[]
  units(): void {
    this.service.uinitsdata().subscribe({
      next: (res: any) => {
        this.unitss = res; 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // timess:any=[]
  // timesss(): void {
  //   this.service.times().subscribe({
  //     next: (res: any) => {
  //       this.timess = res; 
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }


  


  
}
