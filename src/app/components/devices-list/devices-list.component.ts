import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { DeviceService } from '../../services/device.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    console.log('Deletando dispositivos');
    const data = Array.from(this.selectedDevices)
    this.deviceService.deleteListDevice(data)
      .then(value => {
        console.log("Dispositivo removido")
      })
      .catch(reason => {
        console.log("Dispositivo não foi removido")
      })
    this.selectedDevices.clear();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.devices.filter = filterValue.trim().toLowerCase();

    if (this.devices.paginator) {
      this.devices.paginator.firstPage();
    }
  }
}
