import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-transportation',
  templateUrl: './transportation.component.html',
  styleUrls: ['./transportation.component.css']
})
export class TransportationComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      currentTransportationMethod:[''],
      frequencyTransportationUse:[''],
      TransportationBarries:[''],
      emergencyContactForTransportation:[''],
      distancetravelled:[''],
      acessibilityNeed:[''],
    })
  }

  addMyForm(){
    this.api.addTranportation(this.thisForm.value).subscribe((res:any)=>{
      
      this.swet.SucessToast(`Tranportation  added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getTranportation();
  }

  tranportationData:any[] = []
  getTranportation(){
    this.api.getTranportation().subscribe((res:any)=>{
      this.tranportationData = res
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
