import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-room-tasks',
  templateUrl: './room-tasks.component.html',
  styleUrls: ['./room-tasks.component.css']
})
export class RoomTasksComponent implements OnInit {
  addTaskForm: FormGroup;

  roomID: string = '';
  roomIDsend: any;
  constructor(private route: ActivatedRoute,private sweet: SweetalertssService,private api:AllService,private router: Router,private http:HttpClient,private fb:FormBuilder) {
    const roomNo = localStorage.getItem('roomNumber');
this.roomIDsend = roomNo;
    this.addTaskForm = this.fb.group({
      project_id:[this.roomIDsend],
      user_id:[''],
      milestone_id:[''],
      title:[''],
      day:[''],
      task_days:[''],
      description:[''],
      priority:[''],
      start_date:[''],
      due_date:[''],
      time:[''],
      status:[''],
      class:[''],
      task_message:[''],
      comment_count:[''],
    })
  }

  onSubmit(): void {
    if (this.addTaskForm.valid) {
      this.api.postTaskFromRoom(this.addTaskForm.value).subscribe((res:any)=>{
        this.sweet.SucessToast('Task added succesfully')
        window.location.reload()
      })
      console.log('Form Data:', this.addTaskForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  ByIdData:any=[];

  ngOnInit(): void {
    const roomData = localStorage.getItem('roomDetails');
    if (roomData) {
      this.ByIdData = JSON.parse(roomData);
      console.log("Retrieved room data:", this.ByIdData);
    }

  this.fetchRoomUsers();
  this.getTasks()
  }

  roomUsers: any[] = [];
errorMessage: string = '';
fetchRoomUsers(): void {
  this.api.getRoomUsersdata(null).subscribe({
    next: (data) => {
      this.roomUsers = data;
      console.log('Room users:', this.roomUsers);
    },
    error: (error) => {
      this.errorMessage = 'Failed to fetch room users';
      console.error(error);
    }
  });
}

  allTasks:any[]=[];
  getTasks(){[
    this.api.getTasksOFRoom().subscribe((res:any)=>{
      this.allTasks = res
    })
  ]}

}
