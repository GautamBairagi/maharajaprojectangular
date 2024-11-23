import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-health-medical',
  templateUrl: './health-medical.component.html',
  styleUrls: ['./health-medical.component.css']
})
export class HealthMedicalComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      currentMedicalConditions:[''],
      medications:[''],
      allergies:[''],
      recentHospitalizationsAndSurgeries:[''],
      primaryHealthCareProvider:[''],
      specialistReferrals:[''],
    })
  }

  addMyForm(){
    this.api.healthMedical(this.thisForm.value).subscribe((res:any)=>{
      console.log('current health form response',res)
      this.swet.SucessToast(`Health medication added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getHealthM();
  }

  healthMData:any[] = []
  getHealthM(){
    this.api.healthMedicalGet().subscribe((res:any)=>{
      this.healthMData = res
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
