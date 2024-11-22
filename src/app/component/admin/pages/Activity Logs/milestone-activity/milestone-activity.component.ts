import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-milestone-activity',
  templateUrl: './milestone-activity.component.html',
  styleUrls: ['./milestone-activity.component.css']
})
export class MilestoneActivityComponent implements OnInit {
  activityData: any[] = [];
  displayedData: any[] = []; // Data for the current page
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private api:AllService){}

  ngOnInit(): void {
    this.getActivityData()
  }

  getActivityData(): void {
    this.api.getmilestoneactivity().subscribe((res: any) => {
      this.activityData = res.map((item: any) => {
        const parsedMessage = JSON.parse(item.message || '{}'); // Handle empty or invalid message
        return {
          ...item,
          parsedMessage: {
            name: parsedMessage.name || 'Unknown',
            room_number: parsedMessage.room_number || 0,
            task_count: parsedMessage.task_count || 0,
            comment_count: parsedMessage.comment_count || 0,
            ...parsedMessage, // Include other properties if they exist
          },
        };
      });
      this.updateDisplayedData();
    });
  }
  

  updateDisplayedData(): void {
    const filteredData = this.activityData.filter(item => {
      const query = this.searchQuery.toLowerCase();
  
      // Safely access and convert values to strings, fallback to empty strings
      const firstName = item.first_name?.toLowerCase() || '';
      const lastName = item.last_name?.toLowerCase() || '';
      const status = item.status?.toLowerCase() || '';
      const roomName = item.parsedMessage?.name?.toLowerCase() || '';
      const roomNumber = item.parsedMessage?.room_number?.toString() || '';
      const taskCount = item.parsedMessage?.task_count?.toString() || '';
      const commentCount = item.parsedMessage?.comment_count?.toString() || '';
  
      // Check if the query matches any field
      return (
        firstName.includes(query) ||
        lastName.includes(query) ||
        status.includes(query) ||
        roomName.includes(query) ||
        roomNumber.includes(query) ||
        taskCount.includes(query) ||
        commentCount.includes(query)
      );
    });
  
    this.totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedData = filteredData.slice(startIndex, endIndex);
  }
  

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedData();
    }
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    const query = inputElement?.value || ''; // Optional chaining and fallback
    this.searchQuery = query.trim().toLowerCase();
    this.currentPage = 1; // Reset to the first page
    this.updateDisplayedData();
  }
  

}
