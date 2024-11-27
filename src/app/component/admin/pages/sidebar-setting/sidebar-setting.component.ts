import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SweetalertssService } from 'src/app/sweetalertss.service';
import { ThemeService } from 'src/app/theme.service';



@Component({
  selector: 'app-sidebar-setting',
  templateUrl: './sidebar-setting.component.html',
  styleUrls: ['./sidebar-setting.component.css']
})
export class SidebarSettingComponent implements OnInit {
  updatesideMenu: FormGroup;
  updateLogo: FormGroup;
  edit: any;

  header_color: string = '#ffffff';
  sidebar_color: string = '#2f4f4f';
  header_font_color: string = '#000000';
  sidebar_font_color: string = '#000000';


  userId:any

  constructor(private api: AllService, private http: HttpClient, private fb: FormBuilder, private sweet: SweetalertssService,private theme:ThemeService) {
    this.updatesideMenu = this.fb.group({
      // id: new FormControl(''),
      side_name: [''],
    });

    const userIdString = localStorage.getItem('userId');
    this.userId = userIdString ? parseInt(userIdString, 10) : null;

    this.updateLogo = this.fb.group({
      title: [''],
      logo: [''],
      user_id: [this.userId],
    })

    // this.headerColor = this.api.getHeaderColor();
    // this.sidebarColor = this.api.getSidebarColor();
    // this.headerFontColor = this.api.getHeaderFontColor();
    // this.sidebarFontColor = this.api.getSidebarFontColor();
  }

  // updateHeaderColor(color: string) {
  //   this.theme.setHeaderColor(color);
  // }

  // updateSidebarColor(color: string) {
  //   this.theme.setSidebarColor(color);
  // }

  // updateHeaderFontColor(color: string) {
  //   this.theme.setHeaderFont(color);
  // }

  // updateSidebarFontColor(color: string) {
  //   this.theme.setSidebarFont(color);
  // }

  // editMenu(){
  //   this.api.editSideMenuName(this.id, this.ByIdsideMenu).subscribe((res:any)=>{
  //   })
  // }

  editMenu() {
    const updatedData = { id: this.id, side_name: this.ByIdsideMenu.side_name };

    this.api.editSideMenuName(this.id, updatedData).subscribe(
      (res: any) => {
        console.log('Menu updated successfully!', res);
        window.location.reload()
      },
      (err: any) => {
        console.error('Error updating menu', err);
      }
    );
  }

  editSubMenu() {
    const updatedData = { id: this.id, name: this.ByIdsubMenu.name };

    this.api.editSubSideMenuName(this.id, updatedData).subscribe(
      (res: any) => {
        console.log(' Sub Menu updated successfully!', res);
        window.location.reload()
      },
      (err: any) => {
        console.error('Error updating menu', err);
      }
    );
  }

  id: any;
  ByIdsideMenu: any = [];
  ByIdsubMenu: any = [];

  sideMenuById(data: any) {
    this.id = data;
    this.api.sibeMenuById(data).subscribe((res: any) => {
      this.ByIdsideMenu = res; // Assuming 'res' is the object for the specific menu item
    });
  }

  subSideMenuById(data: any) {
    this.id = data;
    this.api.subSideMenuById(data).subscribe((res: any) => {
      this.ByIdsubMenu = res; // Assuming 'res' is the object for the specific menu item
    });
  }

  ngOnInit(): void {
    this.getSideMenus()
    this.getSubMenus()
    
    this.theme.loadThemeSettingsFromApi();

    this.theme.getThemeSettings().subscribe((settings) => {
      if (settings) {
        // console.log('Updated Settings:', settings);
        this.header_color = settings.header_color;
        this.sidebar_color = settings.sidebar_color;
        this.header_font_color = settings.header_font;
        this.sidebar_font_color = settings.sidebar_font;
      }
    });
    
    // Subscribe to the current theme settings
    // this.theme.getThemeSettings().subscribe((settings) => {
    //   console.log('res from BehaviorSubject:', settings);
    //   this.header_color = settings.header_color;
    //   this.sidebar_color = settings.sidebar_color;
    //   this.header_font_color = settings.header_font_color;
    //   this.sidebar_font_color = settings.sidebar_font_color;
    // });


    

    // this.theme.applyTheme(settings);
  }

  updateHeaderColor(color: string) {
    this.theme.updateHeaderColor(color);
  }

  updateSidebarColor(color: string) {
    this.theme.updateSidebarColor(color);
  }

  updateHeaderFontColor(color: string) {
    this.theme.updateHeaderFontColor(color);
  }

  updateSidebarFontColor(color: string) {
    this.theme.updateSidebarFontColor(color);
  }


  allMenus: any[] = [];
  subMenus: any[] = [];

  getSideMenus() {
    this.api.getsidebarmenu().subscribe((res: any) => {
      this.allMenus = res;
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

      this.subMenuGroups = res;
      // Convert the grouped object into an array
      this.subMenuGroups = Object.keys(grouped).map(parentName => ({
        parent_name: parentName,
        subMenus: grouped[parentName].sort((a: any, b: any) => a.position - b.position)
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




  onDropsub(event: CdkDragDrop<any[]>) {
    // Flatten the submenus to access items by index
    const flatSubMenus = this.subMenuGroups.flatMap(group => group.subMenus);

    // Retrieve IDs and positions of dragged and replaced items
    const draggedItemId2 = flatSubMenus[event.previousIndex].id;
    const draggedItemPosition2 = flatSubMenus[event.previousIndex].position;
    const replacedItemId2 = flatSubMenus[event.currentIndex].id;
    const replacedItemPosition2 = flatSubMenus[event.currentIndex].position;

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
      draggedItemId2,
      replacedItemId2,
      draggedItemPosition2,
      replacedItemPosition2
    );

    console.log(draggedItemId2,
      replacedItemId2,
      draggedItemPosition2,
      replacedItemPosition2)
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
    draggedItemId2: number,
    replacedItemId2: number,
    draggedItemPosition2: number,
    replacedItemPosition2: number
  ) {
    const url = 'http://192.168.1.231:5000/subsidebar';
    const payload = {
      first_id: replacedItemId2,
      last_id: draggedItemId2,
      new_position: draggedItemPosition2,
      old_position: replacedItemPosition2
    };



    this.api.updateMenu(url, payload,

    ).subscribe(
      (response) => {
        console.log('Drag and drop data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending drag and drop data:', error);
      }
    );
  }


  changeLogo() {
    this.updateLogo.value.logo = this.url;
    this.api.postLogo(this.updateLogo.value).subscribe((res: any) => {
      this.sweet.SucessToast('Logo Changes Succesfully')
      window.location.reload()
    })
  }

  url: any;

  onSelectFile(event: any) {
    let file = event.target.files[0];
    console.log('hello', file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.url = reader.result;
      console.log('lo', this.url);
      this.updateLogo.value.logo = reader.result;
    };
    if (event.target.files && event.target.files[0]) {
      if (
        event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg' ||
        event.target.files[0].type === 'application/pdf' ||
        event.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        if (event.target.files[0].size < 200 * 200) {
          / Checking height  width*/
        }
        if (event.target.files[0].size < 20000) {
          / checking size here - 2MB /
        }
      }
    }
  }

  isPDF(url: string): boolean {
    return url.startsWith('data:application/pdf');
  }

  isExcel(url: string): boolean {
    return url.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  isImage(url: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    return imageExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }



}
