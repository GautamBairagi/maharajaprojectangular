import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-safety',
  templateUrl: './safety.component.html',
  styleUrls: ['./safety.component.css']
})
export class SafetyComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      currentSafteyConcerns:[''],
      homeSafteyAssessment:[''],
      previousAccidentsOrInjuries:[''],
      emergencyContactInfo:[''],
      safteyPlanInPlace:[''],
      safteyequipmentInUse:[''],
    })
  }

  addMyForm(){
    this.api.safety(this.thisForm.value).subscribe((res:any)=>{
      this.swet.SucessToast(` Safety added`);
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getSafety();
  }

  safetyData:any[] = []
  getSafety(){
    this.api.safetyGet().subscribe((res:any)=>{
      this.safetyData = res
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

