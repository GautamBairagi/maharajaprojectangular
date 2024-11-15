import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; // Import HttpClient


@Component({
  selector: 'app-sidebar-setting',
  templateUrl: './sidebar-setting.component.html',
  styleUrls: ['./sidebar-setting.component.css']
})
export class SidebarSettingComponent implements OnInit {

  constructor(private api:AllService, private http: HttpClient){}

  ngOnInit(): void {
    this.getSideMenus()
  }

  allMenus:any[] = [];

  getSideMenus(){
    this.api.getsidebarmenu().subscribe((res:any)=>{
      this.allMenus =res;
      this.allMenus = res.sort((a: any, b: any) => a.position - b.position);
    })
  }


  onDrop(event: CdkDragDrop<any[]>) {
    // Get ID and position of the item that was dragged
    const draggedItemId = this.allMenus[event.previousIndex].id;
    const draggedItemPosition = this.allMenus[event.previousIndex].position;

    // Get ID and position of the item it replaced
    const replacedItemId = this.allMenus[event.currentIndex].id;
    const replacedItemPosition = this.allMenus[event.currentIndex].position;

    // Reorder the array in the UI
    moveItemInArray(this.allMenus, event.previousIndex, event.currentIndex);

    // Send both IDs and positions to the server
    this.sendDragAndDropDataToServer(draggedItemId, replacedItemId, draggedItemPosition, replacedItemPosition);
  }

  sendDragAndDropDataToServer(
    draggedItemId: number,
    replacedItemId: number,
    draggedItemPosition: number,
    replacedItemPosition: number
  ) {
    const url = 'http://192.168.1.231:5000/sidebar';
    const payload = {
      first_id: replacedItemId,
      last_id: draggedItemId,
      new_position: draggedItemPosition,
      old_position: replacedItemPosition
    };

    // const headers = new HttpHeaders({
    //   'Content-type': 'application/json',
    //   'Authkey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0MiwiZW1haWwiOiJtYXlhbmtAZ21haWwuY29tIiwiaWF0IjoxNzMxNTc2OTY2LCJleHAiOjE3MzE1ODA1NjZ9.AARNo8FQeEPtQmwjnru5FkIuY9PseVHVjVAANP6T-sw'
    // });

    this.api.updateMenu(url, payload, 
      // { headers }

    ).subscribe(
      (response) => {
        console.log('Drag and drop data sent successfully:', response);
        
        window.location.reload()
      },
      (error) => {
        console.error('Error sending drag and drop data:', error);
      }
    );
  }

}
