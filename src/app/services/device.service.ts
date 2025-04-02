import { Injectable } from '@angular/core';
import {ApiService} from './http.service';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceService extends ApiService {

  constructor() {
    super()
  }

  async findAllDevices() {
    return of(await this.findAll('devices'));
  }

  createDevice(data: unknown) {
    return this.create('devices', data);
  }

  deleteDevice(id: number) {
    return this.delete('devices', id);
  }
}
