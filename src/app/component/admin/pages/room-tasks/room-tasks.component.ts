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
  addCommentForm: FormGroup;

  roomID: string = '';
  roomIDsend: any;
  constructor(private route: ActivatedRoute, private sweet: SweetalertssService, private api: AllService, private router: Router, private http: HttpClient, private fb: FormBuilder) {
    const roomNo = localStorage.getItem('roomNumber');
    this.roomIDsend = roomNo;
    this.addTaskForm = this.fb.group({
      project_id: [this.roomIDsend],
      user_id: [''],
      milestone_id: [''],
      title: [''],
      day: [''],
      task_days: [''],
      description: [''],
      priority: [''],
      start_date: [''],
      due_date: [''],
      time: [''],
      status: [''],
      class: [''],
      task_message: [''],
      comment_count: [''],
    })

    this.addCommentForm = this.fb.group({
      project_id: [''],
      user_id: [''],
      task_id: [''],
      comment: [''],
    })
  }


  selectedTask: any;
  setCommentFormData(task: any) {
    this.selectedTask = task;
    this.loadCommentsForTask(task.id);
    this.addCommentForm.patchValue({
      project_id: task.project_id, // Pass project ID from the task object
      user_id: task.user_id,       // Pass user ID(s) from the task object
      task_id: task.id,            // Pass task ID from the task object
      comment: ''                  // Empty field for user input
    });
  }

  taskCommentsCount: { [taskId: number]: number } = {};
  loadCommentsForTask(taskId: number) {
    this.taskComments = {}; // Clear previous task comments
    this.api.getComments().subscribe((res: any[]) => {
      this.taskComments[taskId] = res.filter(comment => comment.task_id === taskId);
      this.taskCommentsCount[taskId] = this.taskComments[taskId].length;
      console.log('Comments for Task:', taskId, this.taskComments[taskId]);
    });
  }

  loadAllComments() {
    this.api.getComments().subscribe((res: any[]) => {
      this.taskCommentsCount = {};
      res.forEach(comment => {
        if (!this.taskCommentsCount[comment.task_id]) {
          this.taskCommentsCount[comment.task_id] = 0;
        }
        this.taskCommentsCount[comment.task_id]++;
      });
    });
  }
  

  onSubmitComment() {
    if (this.addCommentForm.valid) {
      const formData = this.addCommentForm.value;
      console.log('Posting Comment:', formData);

      // // Example: HTTP POST request
      this.api.postComments(formData).subscribe((res) => {
        this.sweet.SucessToast('Comment added successfully')
        window.location.reload()
      });
    } else {
      console.error('Form is invalid!');
    }
  }

  onSubmit(): void {
    if (this.addTaskForm.valid) {
      this.api.postTaskFromRoom(this.addTaskForm.value).subscribe((res: any) => {
        this.sweet.SucessToast('Task added succesfully')
        // window.location.reload()
      })
      console.log('Form Data:', this.addTaskForm.value);
    } else {
      console.error('Form is invalid');
    }
  }

  ByIdData: any = [];

  ngOnInit(): void {
    const roomData = localStorage.getItem('roomDetails');
    if (roomData) {
      this.ByIdData = JSON.parse(roomData);
      console.log("Retrieved room data:", this.ByIdData);
    }

    this.fetchRoomUsers();
    this.getTasks();
    this.loadAllComments();
  }

  allComments: any;
  // commentsGet() {
  //   this.api.getComments().subscribe((res: any) => {
  //     this.allComments = res
  //   })
  // }

  taskComments: { [taskId: string]: any[] } = {};

  // commentsGet() {
  //   this.api.getComments().subscribe((res: any[]) => {
     
  //     this.taskComments = res.reduce((acc: { [taskId: string]: any[] }, comment) => {
  //       const taskId = comment.task_id; // Ensure correct key assignment
  //       if (!acc[taskId]) {
  //         acc[taskId] = [];
  //       }
  //       acc[taskId].push(comment);
  //       return acc;
  //     }, {});
  //     console.log('Mapped Comments:', this.taskComments);
      
  //   });
  // }

  // fetchCommentsForTask(task_id: string) {
  //   this.api.getCommentsByTaskId(task_id).subscribe((res: any) => {
  //     this.taskComments[task_id] = res; 
  //   });
  // }

  // commentsGetForAllTasks() {
  //   this.allTasks.forEach((task: any) => {
  //     this.fetchCommentsForTask(task.id); 
  //   });
  // }
  

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

  allTasks: any[] = [];
  getTasks() {
    [
      this.api.getTasksOFRoom().subscribe((res: any) => {
        this.allTasks = res
      })
    ]
  }

  userDetails: { [key: string]: { first_name: string; last_name: string } } = {};

  fetchUserDetails(userId: string) {
    // Check if user details are already fetched
    if (!this.userDetails[userId]) {
      this.api.getUserDtlsRooms(userId).subscribe((data: any[]) => {
        // Assuming the API returns an array with one object
        const user = data[0]; // Access the first object in the array
        this.userDetails[userId] = {
          first_name: user.first_name,
          last_name: user.last_name
        };
      });
    }
  }

  getInitials(userId: string): string {
    const user = this.userDetails[userId];
    if (user) {
      const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
      const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
      return firstInitial || lastInitial ? `${firstInitial}${lastInitial}` : 'U';
    }
    return 'User'; // Default to 'U' while loading
  }

}
