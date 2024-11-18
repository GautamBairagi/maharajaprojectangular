import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private api:AllService) {}

  allData :any[] = []
ngOnInit(): void {
  const roomData = this.api.getRoomData();
  this.allData = roomData
  console.log("Received room data:", roomData);
}
}
