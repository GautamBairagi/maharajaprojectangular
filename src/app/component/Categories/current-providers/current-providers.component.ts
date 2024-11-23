import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-current-providers',
  templateUrl: './current-providers.component.html',
  styleUrls: ['./current-providers.component.css']
})
export class CurrentProvidersComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      providerName:[''],
      speciality:[''],
      contactInfo:[''],
      address:[''],
      dateOfVisit:[''],
      notesOnProvider:[''],
    })
  }

  addMyForm(){
    this.api.currentProvider(this.thisForm.value).subscribe((res:any)=>{
      console.log('current provider form response',res)
      this.swet.SucessToast(`Current provider added`);
      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getCurrentProvider();
  }

  cpData:any[] = []
  getCurrentProvider(){
    this.api.currentProviderGet().subscribe((res:any)=>{
      this.cpData = res
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
