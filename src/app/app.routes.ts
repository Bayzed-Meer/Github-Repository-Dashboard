import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { ChartsComponent } from './components/charts/charts.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'discover' },
  { path: 'discover', component: DisplayComponent },
  { path: 'charts', component: ChartsComponent },
];
