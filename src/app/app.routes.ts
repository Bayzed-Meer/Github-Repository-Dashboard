import { Routes } from '@angular/router';
import { DisplayComponent } from './components/display/display.component';
import { ChartsComponent } from './components/charts/charts.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'discover' },
  { path: 'discover', component: DisplayComponent },
  {
    path: 'charts',
    loadComponent: () =>
      import('./components/charts/charts.component').then(
        (m) => m.ChartsComponent
      ),
  },
  {
    path: 'charts/barchart',
    loadComponent: () =>
      import('./components/charts/bar-chart/bar-chart.component').then(
        (m) => m.BarChartComponent
      ),
  },
  {
    path: 'charts/piechart',
    loadComponent: () =>
      import('./components/charts/pie-chart/pie-chart.component').then(
        (m) => m.PieChartComponent
      ),
  },
];
