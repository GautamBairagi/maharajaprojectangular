import { Component } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {

  constructor(
    private service:AllService
  ){}

  allData:any[] = []
  ngOnInit(): void {
 
    const userData = this.service.getUserData();
    this.allData = userData
    console.log("Receive user data:", userData);
  }








}
