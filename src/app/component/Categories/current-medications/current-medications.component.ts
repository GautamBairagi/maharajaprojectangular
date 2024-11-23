import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-current-medications',
  templateUrl: './current-medications.component.html',
  styleUrls: ['./current-medications.component.css']
})
export class CurrentMedicationsComponent  implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      medicationName:[''],
      dosage:[''],
      frequencyOfAdministration:[''],
      RouteOfAdministration:[''],
      startDate:[''],
      prescribingHealthCareProvider:[''],
    })
  }

  addMyForm(){
    this.api.currentMedication(this.thisForm.value).subscribe((res:any)=>{
      console.log('current Medication form response',res)
      this.swet.SucessToast(`Current Medication added`);
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getCurrentMedication();
  }

  cmData:any[] = []
  getCurrentMedication(){
    this.api.currentMedicationGet().subscribe((res:any)=>{
      this.cmData = res
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
