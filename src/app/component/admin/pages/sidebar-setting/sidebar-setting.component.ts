import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient,HttpHeaders  } from '@angular/common/http'; // Import HttpClient
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-sidebar-setting',
  templateUrl: './sidebar-setting.component.html',
  styleUrls: ['./sidebar-setting.component.css']
})
export class SidebarSettingComponent implements OnInit {
  updatesideMenu:FormGroup;
  edit: any;

  constructor(private api:AllService, private http: HttpClient,private fb:FormBuilder){
    this.updatesideMenu = this.fb.group({
      // id: new FormControl(''),
      side_name: [''],
    });
  }

  editMenu(){
    this.api.editSideMenuName(this.id, this.ByIdsideMenu).subscribe((res:any)=>{
    })
  }

  id:any;
  ByIdsideMenu:any=[];
  sideMenuById(data: any) {
    this.id = data
    console.log("daataaaaa", this.id)
    this.api.sibeMenuById(data).subscribe((res: any) => {
      this.ByIdsideMenu = res;
      // this.updatesideMenu.patchValue({ id: this.edit.id });
      
    })
  }

  ngOnInit(): void {
    this.getSideMenus()
    this.getSubMenus()
  }

  allMenus:any[] = [];
  subMenus:any[] = [];

  getSideMenus(){
    this.api.getsidebarmenu().subscribe((res:any)=>{
      this.allMenus =res;
      this.allMenus = res.sort((a: any, b: any) => a.position - b.position);
    })
  }

  subMenuGroups: any[] = []; // Array to store grouped submenus

  getSubMenus() {
    this.api.getsubmenu().subscribe((res: any) => {
      // Group submenus by parent_name
      const grouped = res.reduce((acc: any, submenu: any) => {
        // Initialize array for each unique parent_name
        if (!acc[submenu.parent_name]) {
          acc[submenu.parent_name] = [];
        }
        // Add the current submenu to its respective parent group
        acc[submenu.parent_name].push(submenu);
        return acc;
      }, {});
  
      this.subMenuGroups = res.sort((a: any, b: any) => a.position - b.position);
this.subMenuGroups = res;
      // Convert the grouped object into an array
      this.subMenuGroups = Object.keys(grouped).map(parentName => ({
        parent_name: parentName,
        subMenus: grouped[parentName]
      }));
    });
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

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authkey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0MiwiZW1haWwiOiJtYXlhbmtAZ21haWwuY29tIiwiaWF0IjoxNzMxNTgwNzkzLCJleHAiOjE3MzE1ODQzOTN9.5Urqsfne_4N2nVP44RocFfSU753qqdeLbVsoi15lWy8'
    });

    this.api.updateMenu(url, payload, { headers }).subscribe(
      (response) => {
        console.log('Drag and drop data sent successfully:', response);
        
        window.location.reload()
      },
      (error) => {
        console.error('Error sending drag and drop data:', error);
      }
    );
  }




  onDropsub(event: CdkDragDrop<any[]>) {
    // Flatten the submenus to access items by index
    const flatSubMenus = this.subMenuGroups.flatMap(group => group.subMenus);
  
    // Retrieve IDs and positions of dragged and replaced items
    const draggedItemId = flatSubMenus[event.previousIndex].id;
    const draggedItemPosition = flatSubMenus[event.previousIndex].position;
    const replacedItemId = flatSubMenus[event.currentIndex].id;
    const replacedItemPosition = flatSubMenus[event.currentIndex].position;
  
    // Reorder in the flat array
    moveItemInArray(flatSubMenus, event.previousIndex, event.currentIndex);
  
    // Update the positions of items in `flatSubMenus` after reordering
    flatSubMenus.forEach((item, index) => {
      item.position = index + 1; // Adjust position based on new order
    });
  
    // Update the original `subMenuGroups` with the reordered data
    this.subMenuGroups = this.groupByParentName(flatSubMenus);
  
    // Send updated data to the server
    this.sendDragAndDropDataToServerSub(
      draggedItemId,
      replacedItemId,
      draggedItemPosition,
      replacedItemPosition
    );

    console.log( draggedItemId,
      replacedItemId,
      draggedItemPosition,
      replacedItemPosition)
  }

  groupByParentName(flatSubMenus: any[]) {
    const grouped = flatSubMenus.reduce((acc: any, submenu: any) => {
      if (!acc[submenu.parent_name]) {
        acc[submenu.parent_name] = [];
      }
      acc[submenu.parent_name].push(submenu);
      return acc;
    }, {});
  
    return Object.keys(grouped).map(parentName => ({
      parent_name: parentName,
      subMenus: grouped[parentName]
    }));
  }
  
  sendDragAndDropDataToServerSub(
    draggedItemId: number,
    replacedItemId: number,
    draggedItemPosition: number,
    replacedItemPosition: number
  ) {
    const url = 'http://192.168.1.231:5000/subsidebar';
    const payload = {
      first_id: replacedItemId,
      last_id: draggedItemId,
      new_position: draggedItemPosition,
      old_position: replacedItemPosition
    };
  
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authkey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjc0MiwiZW1haWwiOiJtYXlhbmtAZ21haWwuY29tIiwiaWF0IjoxNzMxNTgwNzkzLCJleHAiOjE3MzE1ODQzOTN9.5Urqsfne_4N2nVP44RocFfSU753qqdeLbVsoi15lWy8'
    });
  
    this.api.updateMenu(url, payload, { headers }).subscribe(
      (response) => {
        console.log('Drag and drop data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending drag and drop data:', error);
      }
    );
  }



}
