import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-epsdt',
  templateUrl: './epsdt.component.html',
  styleUrls: ['./epsdt.component.css']
})
export class EpsdtComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      dateOfLastEPSDTScreening:[''],
      screeningResult:[''],
      followUpRecommendations:[''],
      currentHealthAssessment:[''],
      immunizationStatus:[''],
      careCoordination:[''],
    })
  }

  addMyForm(){
    this.api.epsdtrs(this.thisForm.value).subscribe((res:any)=>{
      
      this.swet.SucessToast(`EPSDT added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getEpsd();
  }

  epsdtrData:any[] = []
  getEpsd(){
    this.api.epsdtrsGet().subscribe((res:any)=>{
      this.epsdtrData = res
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
