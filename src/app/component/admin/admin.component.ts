import { Component, OnInit,ElementRef, ViewChild,AfterViewInit   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,AfterViewInit  {
  @ViewChild('cameraFeed', { static: false }) cameraFeed!: ElementRef<HTMLVideoElement>;
  @ViewChild('mySidebar', { static: false }) mySidebar!: ElementRef<HTMLElement>;
  @ViewChild('content', { static: false }) content!: ElementRef<HTMLElement>;

  private viewInitialized = false;

  ngAfterViewInit() {
    this.viewInitialized = true;

    // Debugging: Check if the elements are properly initialized
    console.log('mySidebar initialized:', this.mySidebar);
    console.log('content initialized:', this.content);
    console.log('cameraFeed initialized:', this.cameraFeed);
  }

  toggleNav() {
    if (!this.viewInitialized || !this.mySidebar || !this.content) {
      console.error('View is not fully initialized or elements are undefined.');
      return;
    }

    const sidebar = this.mySidebar.nativeElement;
    const content = this.content.nativeElement;

    // Toggle classes to control the sidebar state
    sidebar.classList.toggle('closed');

    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('open');
    }
  }

  openCamera() {
    if (!this.viewInitialized || !this.cameraFeed) {
      console.error('View is not fully initialized or camera feed is undefined.');
      return;
    }

    const videoElement = this.cameraFeed.nativeElement;

    // Access the camera and display the video feed
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoElement.srcObject = stream;
          videoElement.style.display = 'block';
        })
        .catch((err) => {
          console.error('Error accessing the camera:', err);
        });
    } else {
      alert('Camera is not supported on this device.');
    }
  }


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








