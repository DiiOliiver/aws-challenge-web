import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
    });
  }

  confirm(title: string, message: string) {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    });
  }
}
