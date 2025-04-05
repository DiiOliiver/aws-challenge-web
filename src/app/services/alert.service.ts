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

  error(data: { error: string, messages: string[] }, messageDefault: string = '') {
    let messageBody = ''
    if (data?.messages?.length) {
      data.messages.forEach((value: string) => messageBody+= `• ${value}<br/>`)
    } else {
      messageBody = `• ${data.error ?? messageDefault}`;
    }

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      html: `<p>${messageBody}</p>`,
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
