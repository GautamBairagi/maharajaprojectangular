import { Component } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {

  constructor(
    private service:AllService
  ){}

  files: File[] = [];

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent the browser's default handling
  }

  onDrop(event: DragEvent) {
    event.preventDefault(); // Prevent the browser's default handling
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.handleFileInput(event.dataTransfer.files);
    }
  }

  handleFileInput(fileList: FileList) {
    Array.from(fileList).forEach((file) => {
      this.files.push(file);
    });
  }

  onFileDropped(event: any) {
    console.log('CDK Drop List event:', event); // Handles non-file-related drag/drop actions
  }

  allData:any[] = []
  ngOnInit(): void {
 
    const userData = this.service.getUserData();
    this.allData = userData
    console.log("Receive user data:", userData);
  }








}
