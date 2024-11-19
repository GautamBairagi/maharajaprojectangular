import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';


@Component({
  selector: 'app-clientview',
  templateUrl: './clientview.component.html',
  styleUrls: ['./clientview.component.css']
})
export class ClientviewComponent {

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
        first_name :['' ],
        last_name :['', ],
        date_of_birth :['', ],
        date_of_joining :['', ],
        designation :['', ],
        phone :[''],
      })
    }
    
    userId:any
    ck: boolean = false;
    
    dataSend: any
    
      ngOnInit(): void {
        this.getusersdatas();
    
    
      }
      getusersData:any= []
      getusersdatas() {
        this.service.getclientsdata().subscribe({
          next: (res: any) => {
            this.getusersData = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

    addClient(){
      this.router.navigate(['/Admin/Addclient'])
    }
    
    userprofile(){
      this.router.navigate(['/Admin/Clientdetails'])
    }

 
  
    
    
    
    
    
    
    id:any;
    userByIdData:any=[];
      ById(data: any) {
        this.id = data
        console.log("user id", this.id)
        this.service.getuserById(data).subscribe((res: any) => {
          this.userByIdData = res[0];
          this.userprofile()
          this.service.setclientData(this.userByIdData);
          console.log("policy by id", this.userByIdData)
        })
      }


          
      client_idss:any;
    userByIdDatas:any=[];
      ByIds(data: any) {
        this.id = data
        console.log("user id", this.id)
        this.service.getuserById(data).subscribe((res: any) => {
          this.userByIdData = [res[0]];
          this.client_idss=res[0].id
          localStorage.setItem('clientdetails', JSON.stringify(this.userByIdData));
          localStorage.setItem('clientid', JSON.stringify(data));
      // Store the data in the service

          this.userprofile()
          
          this.service.setclientData(this.userByIdData);
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
        });
      }
    
      updatestatuser() {
        this.service.Userstatusupdatess(this.id, this.userByIdData).subscribe((res: any) => {
          console.log('Nurse updated successfully', res);
          this.swet.SucessToast(`Alottement Updated Successfully`);
          window.location.reload()
        }, (error) => {
          console.error('Error updating user', error);
        });
      }
  
  // Convert the active value to the corresponding status string
getStatus(active: number): string {
  switch (active) {
    case 1:
      return "1"; // Admit
    case 2:
      return "2"; // Discharge
    case 0:
    default:
      return "0"; // Inactive
  }
}

// Handle status updates
updateStatus(user: any, newStatus: string) {
  const id = user.id;
  const updatedStatus = parseInt(newStatus, 10);

  this.dataSend = {
    active: updatedStatus,
  };

  this.service.clientstatusupdates(id, this.dataSend).subscribe(
    (res: any) => {
      if (res) {
        this.getusersdatas(); // Refresh user data
        console.log("uop",this.getusersdatas())
        const statusText = this.getStatusText(updatedStatus);
        this.swet.SucessToast(`Status updated to ${statusText} successfully!`);
      }
    },
    (err: any) => {
      console.error(err);
    }
  );
}

// Convert the active number to a status label for toast messages
// getStatusText(active: number): string {
//   switch (active) {
//     case 1:
//       return "Admit";
//     case 2:
//       return "Discharge";
//     case 0:
//     default:
//       return "Inactive";
//   }
// }



getStatusText(active: number): string {
  switch (active) {
    case 1: // Admit
      return 'btn-success'; // Green
    case 2: // Discharge
      return 'btn-danger'; // Red
    case 0: // Inactive
    default:
      return 'btn-warning'; // Orange
  }
}

ByIdData:any=[];
roomDetails(data: any) {
  this.id = data;
  console.log("dataaaaa", this.id);
  this.service.getRoomDtls(data).subscribe((res: any) => {
    this.ByIdData = res;
    this.service.setRoomData(this.ByIdData);
        this.router.navigate(['/Admin/room-details']);
  });
}
    
}
