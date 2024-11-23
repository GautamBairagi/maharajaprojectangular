import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';

@Component({
  selector: 'app-medicine-activity',
  templateUrl: './medicine-activity.component.html',
  styleUrls: ['./medicine-activity.component.css']
})
export class MedicineActivityComponent implements OnInit {
  activityData: any[] = [];
  displayedData: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private api:AllService){}

  ngOnInit(): void {
    this.getActivityData()
  }

  getActivityData(): void {
    this.api.getmedicineactivity().subscribe((res: any) => {
      this.activityData = res.map((item: any) => {
        const parsedMessage = JSON.parse(item.message || '{}'); // Handle empty or invalid message
        return {
          ...item,
          parsedMessage: {
            medicine_name: parsedMessage.medicine_name || 'Unknown',
            medicine_restrictions: parsedMessage.medicine_restrictions || 0,
            allergies: parsedMessage.allergies || 0,
            qty: parsedMessage.qty || 0,
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
      const medicine_name = item.parsedMessage?.medicine_name?.toLowerCase() || '';
      const allergies = item.parsedMessage?.allergies?.toString() || '';
      const medicine_restrictions = item.parsedMessage?.medicine_restrictions?.toString() || '';
      const qty = item.parsedMessage?.qty?.toString() || '';
  
      // Check if the query matches any field
      return (
        firstName.includes(query) ||
        lastName.includes(query) ||
        status.includes(query) ||
        medicine_name.includes(query) ||
        medicine_restrictions.includes(query) ||
        allergies.includes(query) ||
        qty.includes(query)
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

