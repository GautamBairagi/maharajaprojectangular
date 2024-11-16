import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private api:AllService){}

  ngOnInit(): void {
    this.getRooms()
  }

  allRooms:any[]=[];
  getRooms(){
    this.api.getRooms().subscribe((res:any)=>{
      this.allRooms = res
    })
  }

  isPopoverVisible: boolean = false;

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  closePopover() {
    this.isPopoverVisible = false;
  }

}
