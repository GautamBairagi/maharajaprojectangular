import { Component, OnInit } from '@angular/core';
import { AllService } from 'src/app/Api/all.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-unit-activity',
  templateUrl: './unit-activity.component.html',
  styleUrls: ['./unit-activity.component.css']
})
export class UnitActivityComponent implements OnInit {
  activityData: any[] = [];
  displayedData: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private api:AllService){}

  ngOnInit(): void {
    this.getActivityData()
  }

  getActivityData(): void {
    this.api.getunitactivity().subscribe((res: any) => {
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

  downloadPDF() {
    const element = document.querySelector('.table-responsive') as HTMLElement; // Cast to HTMLElement
    if (!element) return;
  
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      const imgWidth = 190; // A4 page width in mm
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
  
      let position = 10; // Top margin
  
      // Add the first page
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      // Add more pages if necessary
      while (heightLeft > 0) {
        pdf.addPage();
        position = 0; // Reset top margin for new pages
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('unit-activities.pdf'); // Save the PDF
    });
  }

  // CSV download logic
  downloadCSV() {
    const headers = [
      'First Name',
      'Last Name',
      'Status',
      'Title',
      'Description',
      'Expiry Date',
      'Quantity',
      'Created At',
      'Updated At'
    ];

    // Map data rows
    const rows = this.displayedData.map(activity => [
      activity.first_name,
      activity.last_name,
      activity.status,
      activity.parsedMessage?.title?.toString() || 'N/A',
      activity.parsedMessage?.description?.toString() || '0',
      activity.parsedMessage?.expiry_date?.toString() || '0',
      activity.parsedMessage?.qty?.toString() || '0',
      new Date(activity.created_at).toLocaleString(),
      new Date(activity.updated_at).toLocaleString()
    ]);

    // Combine headers and rows into a CSV format
    const csvContent = [headers, ...rows]
      .map(row => row.map(value => `"${value}"`).join(',')) // Safely escape values
      .join('\n');

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'unit-activities.csv');
    link.click();
    URL.revokeObjectURL(url); // Cleanup
  }

}
