import { Component } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, TabsComponent,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
