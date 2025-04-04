import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from '../../services/device.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlertService } from '../../services/alert.service';

@Component({
  standalone: true,
  selector: 'app-devices-list',
  imports: [
    CommonModule, MatPaginatorModule,
    MatTableModule, MatCheckboxModule,
    MatButtonModule, MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './devices-list.component.html',
  styleUrl: './devices-list.component.scss'
})
export class DevicesListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'color', 'partNumber', 'status'];
  devices = new MatTableDataSource<any>([]);
  selectedDevices = new Set<number>();
  private deviceService: DeviceService = inject(DeviceService)
  private alertService: AlertService = inject(AlertService)

  @ViewChild(MatPaginator) paginator!: MatPaginator

  async ngOnInit(): Promise<void> {
    await this.loadDevices();
  }

  async loadDevices(): Promise<void> {
    const result = await this.deviceService.findAllDevices();
    result.subscribe((data: any) => {
      this.devices.data = data;
      this.devices.paginator = this.paginator;
    });
  }

  toggleSelection(id: number) {
    this.selectedDevices.has(id) ? this.selectedDevices.delete(id) : this.selectedDevices.add(id);
  }

  deleteSelected() {
    this.alertService.confirm('Are you sure?', 'Do you want to delete this device?')
      .then((result) => {
        if (result.isConfirmed) {
          this.deleteDevices();
        }
      })
  }

  private deleteDevices() {
    const data = Array.from(this.selectedDevices)
    this.deviceService.deleteListDevice(data)
      .catch(({ response }) => {
        this.alertService.error(response.data.error)
      })
      .finally(async () => {
        this.selectedDevices.clear();
        await this.loadDevices();
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.devices.filter = filterValue.trim().toLowerCase();

    if (this.devices.paginator) {
      this.devices.paginator.firstPage();
    }
  }
}
