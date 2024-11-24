import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  notifications: any[] = [];

  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: AllService,
    private swet: SweetalertssService,
  ) {

  }


  ngOnInit(): void {
    this.getsidebarsdata();
    this.getSubMenus()
    // this.selectedLanguage = sessionStorage.getItem('language') || 'French';
    this.selectedLanguage = sessionStorage.getItem('language') || 'French';

    this.getLogo()
    // this.service.onNotificationReceived((data) => {
    //   this.notifications.push(data);
    // });
    // this.service.onNotificationReceived((data: { message: string }) => {
      
    //   this.notifications.push({ message: data.message, isNew: true });
    // });

    this.service.onNotificationReceived((data: string) => {
      // Directly push the message to the notifications array
      this.notifications.push(data);
    });
    // this.getNotify()
  }


  // getNotify(){
  //   this.service.getNotify().subscribe((data: { message: string })=>{
  //     // console.log('notify ho jao --',res)
  //     // this.notifications.push({ message: data.message, isNew: true });

  //   })
  // }

  // get newNotificationCount(): number {
  //   return this.notifications.filter(notification => notification.isNew).length;
  // }

  // // Mark all notifications as read
  // markNotificationsAsRead() {
  //   this.notifications.forEach(notification => (notification.isNew = false));
  // }

  get newNotificationCount(): number {
    return this.notifications.length; // The total number of notifications
  }

  // Mark all notifications as read (clear the array)
  markNotificationsAsRead() {
    this.notifications = [];
  }

  sendNotification() {
    const message = { message: 'New Task Assigned!', timestamp: new Date() };
    this.service.sendNotification(message);
  }

  logoGet: any;
  getLogo() {
    this.service.getLogo().subscribe((res: any) => {
      this.logoGet = res
    })
  }

  logouts() {
    localStorage.removeItem('userId');
    localStorage.removeItem('group_id');
    localStorage.removeItem('group_name');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('user_token');
    localStorage.removeItem('username');
    localStorage.removeItem('workspace_id');
    localStorage.removeItem('roomDetails');
    localStorage.removeItem('roomNumber');
    localStorage.removeItem('clientdetails');
    localStorage.removeItem('clientid');
    this.router.navigateByUrl("/", { replaceUrl: true })
  }


  sideData: any[] = [];
  getsidebarsdata() {
    this.service.getsidebarmenu().subscribe({
      next: (res) => {
        // console.log("res sidebar data",res)
        this.sideData = res.sort((a: any, b: any) => a.position - b.position);
        this.sideData = res
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  subMenuData: any[] = [];
  getSubMenus() {
    this.service.getsubmenu().subscribe({
      next: (res: any) => {
        this.subMenuData = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }





  getFilteredSubMenus(parentId: number) {
    return this.subMenuData.filter(sub => sub.parent_id === parentId);
  }



  // handelclick(){
  //   forkJoin([this.getsidefirst(),this.getsecond()]).subscribe({
  //   next:(res)=>{
  //     // res[0] first api data
  //     // res[1] first api data
  //   },
  //   error:(err)=>{

  //   }
  //   })
  // }

  // getsidefirst(){
  //   this.service.getsidebarmenu().subscribe({
  //       next: (res) => {

  //           console.log("res sidebar data",res)
  //           this.sideData = res
  //       },
  //       error: (err) => {
  //           console.log(err);
  //       }
  //   });
  // }


  // getsecond(){
  //   this.service.getsidebarmenu().subscribe({
  //       next: (res) => {
  //           console.log("res sidebar data",res)
  //           this.sideData = res
  //       },
  //       error: (err) => {
  //           console.log(err);
  //       }
  //   });
  // }





  languages = [
    { name: 'English', flagCode: 'us' },
    { name: 'French', flagCode: 'fr' },
    { name: 'Spanish', flagCode: 'es' },
    { name: 'Portuguese', flagCode: 'pt' },
    { name: 'Hindi', flagCode: 'in' },
    { name: 'Russian', flagCode: 'ru' },
    { name: 'German', flagCode: 'de' },
    { name: 'Arabic', flagCode: 'ae' },
    { name: 'Chinese', flagCode: 'cn' },
  ];
  selectedLanguage = 'French';





  // Change Language
  // changeLanguage(language: string): void {
  //   this.selectedLanguage = language;
  //   sessionStorage.setItem('language', language);

  //   this.service.changeLanguage(language).subscribe({
  //     next: () => console.log(`Language changed to ${language}`),
  //     error: (err) => console.error('Error changing language:', err),
  //   });
  // }

  // // Get Language Flag Code
  // getFlagCode(language: string): string {
  //   const lang = this.languages.find((l) => l.name === language);
  //   return lang ? lang.flagCode : 'fr';
  // }


  changeLanguage(language: string): void {
    this.selectedLanguage = language;
    sessionStorage.setItem('language', language);
    this.service.changeLanguage(language).subscribe({
      next: () => console.log(`Language changed to ${language}`),
      error: (err) => console.error('Error changing language:', err),
    });
  }

  getFlagCode(language: string): string {
    const lang = this.languages.find(l => l.name === language);
    return lang ? lang.flagCode : 'fr';
  }

}








