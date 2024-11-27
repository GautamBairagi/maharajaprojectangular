import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm!:FormGroup;
  appointmentForm!: FormGroup;

  constructor(
    private router:Router,
    private fb: FormBuilder,
    private service:AllService,
    private swet :SweetalertssService,
   
  ){
   
  }

  ck: boolean = false;
 

  ngOnInit(): void {

    this.appointmentForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(255)]],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      date: ['', Validators.required],
      appointmentTime: ['', Validators.required]
    });

    this.getusersdatas()
    this.getcliwentsdatas()
    this.getRooms()
    this.getCounts()
    this.getResident();
    this.getAppointments()


    this.loginForm = this.fb.group({
        email: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
    });


}

residentData:any[] = [];
getResident(){
  this.service.getclientsdata().subscribe((res:any)=>{
    this.residentData = res;
    console.log(res)
  })
}

get f() {
  return this.appointmentForm.controls;
}

onSubmit() {
  if (this.appointmentForm.valid) {
    console.log(this.appointmentForm.value);
    this.service.postAppointment(this.appointmentForm.value).subscribe((res:any)=>{
      console.log(res)
      window.location.reload()
    })
  } else {
    console.log('Form is invalid');
  }
}

chart: any; // To store the chart instance


createChart() {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;

  if (this.chart) {
    this.chart.destroy(); // Destroy the old chart instance if it exists
  }

  this.chart = new Chart(ctx, {
    type: 'bar', // Change chart type as needed
    data: {
      labels: ['Rooms', 'Users in rooms', 'Residents in rooms', ], // Labels for the data
      datasets: [
        {
          label: 'Counts',
          data: [
            this.allCount.total_rooms,
            this.allCount.users_in_room,
            this.allCount.client_in_room,
          ], // Map data from API response
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)', // Colors for the bars
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true, // Ensure y-axis starts from zero
        },
      },
    },
  });
}

allCount:any;
getCounts(){
  this.service.getGraph().subscribe((res:any)=>{
    this.allCount = res
    this.createChart();
  })
}

AppointmentsData:any;
getAppointments(){
  this.service.getAppointment().subscribe((res:any)=>{
    this.AppointmentsData = res
  })
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
    localStorage.removeItem('workspace_id');
    

    this.router.navigateByUrl("/", { replaceUrl: true })
}


getusersData:any;
clients:any;
getusersdatas() {
  this.service.getUsersdata().subscribe({
    next: (res: any) => {
      this.getusersData = res.length;
    },
    error: (err) => {
      console.log(err);
    },
  });
}

getcliwentsdatas() {
  this.service.getclientsdata().subscribe({
    next: (res: any) => {
      this.clients = res.length;
    },
    error: (err) => {
      console.log(err);
    },
  });
}


allRooms:any[]=[];
getRooms(){
  this.service.getRooms().subscribe((res:any)=>{
    this.allRooms = res.length
  })
}

}
