import { Routes } from '@angular/router';
import { TabsComponent } from './components/tabs/tabs.component';

export const routes: Routes = [
  { path: '', component: TabsComponent },
  { path: '**', redirectTo: '' }
];
