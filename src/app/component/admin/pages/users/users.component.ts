import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DatePipe]
})
export class UsersComponent implements OnInit  {
//   updateForm!:FormGroup;
// constructor(
//   private service:AllService,
//   private router:Router,
//   private fb: FormBuilder,
//   private swet :SweetalertssService,
// ){
//   const userIdString = localStorage.getItem('userId');
//   this.userId = userIdString ? parseInt(userIdString, 10) : null;


//   this.updateForm = this.fb.group({
//     email: [''],
//     first_name :['' ],
//     last_name :['', ],
//     date_of_birth :['', ],
//     date_of_joining :['', ],
//     designation :['', ],
//     phone :[''],
//   })
// }

// userId:any
// ck: boolean = false;

// dataSend: any

//   ngOnInit(): void {
//     this.getusersdatas();
//     this.loadUsers(); 
//   }
//   getusersData:any= []
//   getusersdatas() {
//     this.service.getUsersdata().subscribe({
//       next: (res: any) => {
//         this.getusersData = res;
//       },
//       error: (err) => {
//         console.log(err);
//       },
//     });
//   }
// onclick(){
//   this.router.navigate(['/Admin/addusers'])
// }



//   updatestatuser() {
//     this.service.Userstatusupdatess(this.id, this.userByIdData).subscribe((res: any) => {
//       console.log('Nurse updated successfully', res);
//       this.swet.SucessToast(`Alottement Updated Successfully`);
//       window.location.reload()
//     }, (error) => {
//       console.error('Error updating user', error);
//     });
//   }


  // toggleVerified(data: any) {
  //   var id = data.id;
  //   this.dataSend = {
  //     active: !data.active 
  //   };
  
  //   this.service.Userstatusupdatess(id, this.dataSend).subscribe(res => {
  //     if (res) {
  //       this.getusersdatas();
  //       const accountStatus = res.active;
  //       const doctorName = res.name;
  //       if (accountStatus) {
  //         this.swet.SucessToast(` Action done Successfully`);
  //       } else {
  //         this.swet.SucessToast(`${doctorName} Lead Action Sccessfully`);
  //       }
  //     }
  //   });
  // }

//   getusersDatasss: any[] = [];
//   searchQuery: string = '';
//   currentPage: number = 1;
//   totalItems: number = 0; 
//   sortDirection: string = 'DESC';
//   sortBy: string = 'first_name'; 


//   loadUsers(): void {
//     const limit = 10; 
//     const offset = (this.currentPage - 1) * limit;  
//     this.service.Usersdatasfilter(this.sortBy, this.sortDirection, limit, offset, this.searchQuery)
//       .subscribe((res: any) => {
//         this.getusersDatasss = res.data; 
//         this.totalItems = res.total;  
//       });
//   }

//   onSortChange(sortBy: string): void {
//     this.sortBy = sortBy;
//     this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
//     this.loadUsers();
//   }

  onSearch(): void {
    this.currentPage = 1; 
    this.loadUsers();
  }


//   onPageChange(page: number): void {
//     this.currentPage = page;
//     this.loadUsers();
//   }



userprofile(){
  this.router.navigate(['/Admin/Userdetails'])
}

id:any;
userByIdData:any=[];
  ById(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.userByIdData = res[0];
      this.service.setUserData(this.userByIdData);
      console.log("policy by id", this.userByIdData)
    })
  }


  userByIdDatas:any=[];
  ByIds(data: any) {
    this.id = data
    console.log("user id", this.id)
    this.service.getuserById(data).subscribe((res: any) => {
      this.userprofile()
      this.userByIdData= [res[0]];
      this.service.setUserData(this.userByIdData);
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


updateForm!: FormGroup;
userId: any;
getusersData: any[] = [];
searchQuery: string = '';
currentPage: number = 1;
totalItems: number = 0;
sortDirection: string = 'DESC';
sortBy: string = 'first_name'; 

rowsPerPage: number = 10; 

constructor(
  private service: AllService,
  private router: Router,
  private fb: FormBuilder,
  private swet: SweetalertssService,
  private datePipe: DatePipe
) {
  const userIdString = localStorage.getItem('userId');
  this.userId = userIdString ? parseInt(userIdString, 10) : null;

  this.updateForm = this.fb.group({
    email: [''],
    first_name: [''],
    last_name: [''],
    date_of_birth: [''],
    date_of_joining: [''],
    designation: [''],
    phone: [''],
  });
}

getFormattedDate(): string {
  return this.datePipe.transform(this.userByIdData.date_of_birth, 'date') || '';
}

ngOnInit(): void {
  // this.getusersdatas();
  this.loadUsers();
}

// Fetch the users
// getusersdatas(): void {
//   this.service.getUsersdata().subscribe({
//     next: (res: any) => {
//       this.getusersData = res; // Correctly bind to the table variable
//     },
//     error: (err) => {
//       console.log(err);
//     },
//   });
// }

loadUsers(): void {
  const limit = this.rowsPerPage; 
  // const limit = 10;
  const offset = (this.currentPage - 1) * limit;
  this.service.Usersdatasfilter(this.sortBy, this.sortDirection, limit, offset, this.searchQuery)
    .subscribe((res: any) => {
      this.getusersData = res; // Update the correct variable
      console.log(" this.getusersData", this.getusersData)
      this.totalItems = res.total; 
      console.log(" this.getusersData",this.totalItems)

    });
}
// Handle sorting
onSortChange(sortBy: string): void {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  this.loadUsers();
}
// Handle search input
// onSearch(): void {
//   this.currentPage = 1;
//   this.loadUsers();
// }
// Handle page change
// onPageChange(page: number): void {
//   this.currentPage = page;
//   this.loadUsers();
// }

onPageChange(page: number): void {
  if (page < 1 || page > Math.ceil(this.totalItems / this.rowsPerPage)) {
    return;
  }
  this.currentPage = page;
  this.loadUsers();
}

// Handle rows per page change
onRowsPerPageChange(): void {
  this.currentPage = 1; // Reset to first page
  this.loadUsers();
}

// Generate pagination buttons
getPaginationButtons(): number[] {
  const totalPages = Math.ceil(this.totalItems / this.rowsPerPage);
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return pages;
}



getStartIndex(): number {
  return (this.currentPage - 1) * this.rowsPerPage + 1;
}

getEndIndex(): number {
  return Math.min(this.currentPage * this.rowsPerPage, this.totalItems);
}






onclick(){
  this.router.navigate(['/Admin/addusers'])
}

dataSend: any
toggleVerified(data: any) {
  var id = data.id;
  this.dataSend = {
    active: !data.active 
  };
  this.service.Userstatusupdatess(id, this.dataSend).subscribe(res => {
    if (res) {
      this.loadUsers();
      const accountStatus = res.active;
      const doctorName = res.name;
      if (accountStatus) {
        this.swet.SucessToast(` Action done Successfully`);
      } else {
        this.swet.SucessToast(` Done Action Sccessfully`);
      }
    }
  });
}




activePopoverIndex: number | null = null;

// togglePopover(index: number): void {
//   // Toggle the popover for the clicked index
//   this.activePopoverIndex = this.activePopoverIndex === index ? null : index;
// }


togglePopover(index: number): void {
  this.activePopoverIndex = this.activePopoverIndex === index ? null : index;
}
}


 
