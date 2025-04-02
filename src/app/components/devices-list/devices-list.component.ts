import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from '../../services/device.service';

@Component({
  standalone: true,
  selector: 'app-devices-list',
  imports: [CommonModule, MatTableModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './devices-list.component.html',
  styleUrl: './devices-list.component.scss'
})
export class DevicesListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'color', 'partNumber', 'status'];
  devices = [] as any;
  selectedDevices = new Set<number>();
  private deviceService: DeviceService = inject(DeviceService)

  async ngOnInit(): Promise<void> {
    await this.loadDevices();
  }

  async loadDevices(): Promise<void> {
    const result = await this.deviceService.findAllDevices();
    result.subscribe((data: any) => {
      this.devices = data;
    });
  }

  toggleSelection(id: number) {
    this.selectedDevices.has(id) ? this.selectedDevices.delete(id) : this.selectedDevices.add(id);
  }

  deleteSelected() {
    console.log('Deletando dispositivos:', Array.from(this.selectedDevices));
    this.selectedDevices.clear();
  }
}
