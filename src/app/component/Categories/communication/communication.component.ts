import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.css']
})
export class CommunicationComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,
    private swet :SweetalertssService

  ){
    this.thisForm = this.fb.group({
      patientName:[''],
      primaryLanguage:[''],
      communicationMethod:[''],
      haeringAbility:[''],
      speechClarity:[''],
      understandingOfInstrunction:[''],
      assistiveCommunicationDevices:[''],
    })
  }

  addMyForm(){
    this.api.addCommunication(this.thisForm.value).subscribe((res:any)=>{
      console.log('communication form response',res)
      this.swet.SucessToast(`Communication added`);
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getCommunication();
  }

  CommunicationData:any[] = []
  getCommunication(){
    this.api.getCommunication().subscribe((res:any)=>{
      this.CommunicationData = res
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

