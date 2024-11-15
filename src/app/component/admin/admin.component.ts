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


  ngOnInit(): void {
    this.getsidebarsdata();
  this.getSubMenus()
}




  logouts() {
    localStorage.removeItem('userId');
    localStorage.removeItem('group_id');
    localStorage.removeItem('group_name');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('user_token');
    localStorage.removeItem('username');
    this.router.navigateByUrl("/", { replaceUrl: true })
}



sideData:any[]=[];
getsidebarsdata(){
      this.service.getsidebarmenu().subscribe({
          next: (res) => {
              console.log("res sidebar data",res)
              this.sideData = res.sort((a: any, b: any) => a.position - b.position);
              this.sideData = res
          },
          error: (err) => {
              console.log(err);
          }
      });
}

subMenuData:any[]=[];
getSubMenus() {
  this.service.getsubmenu().subscribe({
    next: (res: any) => {
      this.subMenuData = res;
    },
    error: (err) => {
      console.log(err);
    },
  });
}





getFilteredSubMenus(parentId: number) {
  return this.subMenuData.filter(sub => sub.parent_id === parentId);
}



// handelclick(){
//   forkJoin([this.getsidefirst(),this.getsecond()]).subscribe({
//   next:(res)=>{
//     // res[0] first api data
//     // res[1] first api data
//   },
//   error:(err)=>{

//   }
//   })
// }

// getsidefirst(){
//   this.service.getsidebarmenu().subscribe({
//       next: (res) => {
     
//           console.log("res sidebar data",res)
//           this.sideData = res
//       },
//       error: (err) => {
//           console.log(err);
//       }
//   });
// }


// getsecond(){
//   this.service.getsidebarmenu().subscribe({
//       next: (res) => {
//           console.log("res sidebar data",res)
//           this.sideData = res
//       },
//       error: (err) => {
//           console.log(err);
//       }
//   });
// }


}






