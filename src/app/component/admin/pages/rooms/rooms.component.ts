import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AllService } from 'src/app/Api/all.service';
import { SweetalertssService } from 'src/app/sweetalertss.service';



@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit,AfterViewInit {

  createRoomForm:FormGroup;

  constructor(private api:AllService, private fb:FormBuilder,private sweet:SweetalertssService){
    this.createRoomForm = this.fb.group({
      name: new FormControl(''),
      user_ids: new FormControl([]),
      client_id: new FormControl([]),
      description: new FormControl(''),
      room_id: new FormControl(''),
    });
  }

  selectedUserIds: string[] = [];


  submitRoom(){
    const formValue = this.createRoomForm.value;

  // Ensure user_ids and client_id are arrays before joining
  const userIds = Array.isArray(formValue.user_ids) ? formValue.user_ids : formValue.user_ids.split(',');
  const clientIds = Array.isArray(formValue.client_id) ? formValue.client_id : formValue.client_id.split(',');

  const formData = {
    ...formValue,
    user_ids: userIds.join(','), // Convert user_ids array to string
    client_id: clientIds.join(','), // Convert client_id array to string
  };
    console.log(formData);

       // Post the transformed data to the API

       this.api.postRoomData(formData).subscribe((response) => {
        this.sweet.SucessToast('Room created successfully')
        window.location.reload()
        console.log('Room created successfully', response);
      });
  }

  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {
    this.getRooms();
    this.getUsers();
    this.getclients();
  }

  allRooms:any[]=[];
  getRooms(){
    this.api.getRooms().subscribe((res:any)=>{
      this.allRooms = res
    })
  }


  userData:any[]=[];
 
  selectedUsers: any[] = [];
  


  getUsers(): void {
    this.api.getUsersdata().subscribe((res: any[]) => {
      this.userData = res;
    });
  }

  getclients(): void {
    this.api.getClients().subscribe((res: any[]) => {
      this.clientData = res;
    });
  }


  toggleSelection(user: any): void {
    const userIdsControl = this.createRoomForm.get('user_ids');

    const index = this.selectedUsers.findIndex((u) => u.id === user.id);

    if (index > -1) {
      // If the user is already selected, remove them
      this.selectedUsers.splice(index, 1);
    } else {
      // Add the user to the selection
      this.selectedUsers.push(user);
    }

    // Update the user_ids form control with the selected user IDs
    userIdsControl?.setValue(this.selectedUsers.map((u) => u.id));
  }


  isUserSelected(user: any): boolean {
    return this.selectedUsers.some((u) => u.id === user.id);
  }


  // In the component class
selectedClients: any[] = []; // To store selected clients
clientData: any[] = []; // Replace with your API response for clients

toggleSelectionClient(client: any): void {
  const clientIdsControl = this.createRoomForm.get('client_id');

  const index = this.selectedClients.findIndex((c) => c.id === client.id);

  if (index > -1) {
    // If the client is already selected, remove them
    this.selectedClients.splice(index, 1);
  } else {
    // Add the client to the selection
    this.selectedClients.push(client);
  }

  // Update the client_id form control with a comma-separated string of client IDs
  const clientIdsString = this.selectedClients.map((c) => c.id).join(',');
  clientIdsControl?.setValue(clientIdsString);
}

isClientSelected(client: any): boolean {
  // Check if the client is in the selectedClients array
  return this.selectedClients.some((c) => c.id === client.id);
}





  userDetails: { [key: string]: { first_name: string; last_name: string } } = {};

  fetchUserDetails(userId: string) {
    // Check if user details are already fetched
    if (!this.userDetails[userId]) {
      this.api.getUserDtlsRooms(userId).subscribe((data: any[]) => {
        // Assuming the API returns an array with one object
        const user = data[0]; // Access the first object in the array
        this.userDetails[userId] = {
          first_name: user.first_name,
          last_name: user.last_name
        };
      });
    }
  }

  getInitials(userId: string): string {
    const user = this.userDetails[userId];
    if (user) {
      const firstInitial = user.first_name ? user.first_name.charAt(0).toUpperCase() : '';
      const lastInitial = user.last_name ? user.last_name.charAt(0).toUpperCase() : '';
      return firstInitial || lastInitial ? `${firstInitial}${lastInitial}` : 'U';
    }
    return 'U'; // Default to 'U' while loading
  }

  isPopoverVisible: boolean = false;

  togglePopover() {
    this.isPopoverVisible = !this.isPopoverVisible;
  }

  closePopover() {
    this.isPopoverVisible = false;
  }

}
