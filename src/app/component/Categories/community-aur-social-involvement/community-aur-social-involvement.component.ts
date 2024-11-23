import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-community-aur-social-involvement',
  templateUrl: './community-aur-social-involvement.component.html',
  styleUrls: ['./community-aur-social-involvement.component.css']
})
export class CommunityAurSocialInvolvementComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      socialActivityLevel:[''],
      perffredSocialActivities:[''],
      frequencyOfSocialInteraction:[''],
      communitySupportGroup:[''],
      BarriesOfSocialInvolvement:[''],
      communityEventParticipation:[''],
    })
  }

  addMyForm(){
    this.api.addCommunicationAndSocial(this.thisForm.value).subscribe((res:any)=>{
      console.log('communication and social form response',res)
      this.swet.SucessToast(`Community or social involment added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getCommunicationAndsocial();
  }

  CommunicationAndsocialData:any[] = []
  getCommunicationAndsocial(){
    this.api.getCommunicationAndSocial().subscribe((res:any)=>{
      this.CommunicationAndsocialData = res

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
