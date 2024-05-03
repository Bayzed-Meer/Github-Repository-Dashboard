import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';


@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [BarChartComponent, PieChartComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {}
