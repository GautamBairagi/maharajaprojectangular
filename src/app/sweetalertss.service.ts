import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class SweetalertssService {

  constructor() { }
  SucessToast(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      // title: 'Success!',
      text: message, 
      icon: 'success',
      color: 'white',
      background: '#30c730'
    });
  }


  delete(message: string) {
  Swal.fire({
    title: "Are you sure?",
    text:message, 
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}



  errorToasts(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,  // Extended duration for error messages
      title: 'Error!', // Bold title for emphasis
      icon: "error",
      text: message,
      iconColor: '#fff',  // Error icon color set to white for contrast
      background: '#d9534f',  // Strong red background
      color: '#fff',  // White text for readability
      customClass: {
        popup: 'swal-error-toast'  // Add a custom class for further styling (if needed)
      },
      didOpen: (toast) => {
        toast.style.borderRadius = '10px';  // Rounded corners for aesthetics
        toast.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';  // Soft shadow for depth
      }
    });
  }

}


