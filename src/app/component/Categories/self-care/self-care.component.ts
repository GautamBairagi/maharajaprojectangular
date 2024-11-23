import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-self-care',
  templateUrl: './self-care.component.html',
  styleUrls: ['./self-care.component.css']
})
export class SelfCareComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      dailyRoutine:[''],
      personalHygiene:[''],
      mobility:[''],
      medicationManagement:[''],
      dietAndNutrition:[''],
      assistiveDevices:[''],
      homeSafteyConcern:[''],
      houseHoldChores:[''],
      emergencyContact:[''],
      additionalNotes:[''],
    })
  }

  addMyForm(){
    this.api.addSelfHomeCare(this.thisForm.value).subscribe((res:any)=>{
      console.log('Self Home Care form response',res)
      this.swet.SucessToast(`Self Home Care  added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getSelfHomeCare();
  }

  salfHomeCareData:any[] = []
  getSelfHomeCare(){
    this.api.getSelfHomeCare().subscribe((res:any)=>{
      this.salfHomeCareData = res
    })
  }

  residentData:any[] = [];
  getResident(){
    this.api.getclientsdata().subscribe((res:any)=>{
      this.residentData = res;
      console.log(res)
    })
  }

}
