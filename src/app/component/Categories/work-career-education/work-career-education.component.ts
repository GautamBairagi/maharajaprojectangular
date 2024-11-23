import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-work-career-education',
  templateUrl: './work-career-education.component.html',
  styleUrls: ['./work-career-education.component.css']
})
export class WorkCareerEducationComponent implements OnInit {
  thisForm!:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private swet :SweetalertssService){
    this.thisForm = this.fb.group({
      patientName:[''],
      currentEmployementStatus :[''],
      occupation:[''],
      educationalBackground:[''],
      futureCareerGoal:[''],
      skillsAndQualification:[''],
      workHistory:[''],
    })
  }

  addMyForm(){
    this.api.addWorkAndCareer(this.thisForm.value).subscribe((res:any)=>{
      console.log('addWorkAndCareer form response',res)
      this.swet.SucessToast(`AddWork And Career  added`);

      window.location.reload()
    })
  }

  ngOnInit(): void {
    this.getResident();
    this.getWorkAndCareer();
  }

  workAndCareerData:any[] = []
  getWorkAndCareer(){
    this.api.getWorkAndCareer().subscribe((res:any)=>{
      this.workAndCareerData = res
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
