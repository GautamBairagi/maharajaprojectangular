import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-dental',
  templateUrl: './dental.component.html',
  styleUrls: ['./dental.component.css']
})
export class DentalComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      currentDentalConditions:[''],
      lastDenatalVisitDate:[''],
      dentistNameAndContact:[''],
      dentalTreatmentReceived:[''],
      dentalCareRoutine:[''],
      dentalInsuranceInfo:[''],
    })
  }

  addMyForm(){
    this.api.dental(this.thisForm.value).subscribe((res:any)=>{
      console.log(' dental form response',res)
      this.swet.SucessToast(`Dental added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getDental();
  }

  dentalData:any[] = []
  getDental(){
    this.api.dentalGet().subscribe((res:any)=>{
      this.dentalData = res
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