import { Injectable } from '@angular/core';
import { ApiService } from './http.service';
import { of } from 'rxjs';

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

  deleteListDevice(data: number[]) {
    return this.deleteList('devices', { ids: data});
  }
}
