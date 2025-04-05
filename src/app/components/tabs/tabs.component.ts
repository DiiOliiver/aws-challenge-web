import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { DevicesListComponent } from '../devices-list/devices-list.component';
import { CategoriesListComponent } from '../categories-list/categories-list.component';

@Component({
  standalone: true,
  selector: 'app-tabs',
  imports: [CommonModule, MatTabsModule, DevicesListComponent, CategoriesListComponent],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  selectedIndexChange: number = Number(localStorage.getItem('tabSelectedIndex') || 0)

  changeSelected() {
    localStorage.setItem('tabSelectedIndex', String(this.selectedIndexChange))
  }
}
