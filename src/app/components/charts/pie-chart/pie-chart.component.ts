import { RepoService } from '../../../services/repo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MultiSelectComponent,
  MultiSelectModule,
} from '@syncfusion/ej2-angular-dropdowns';
import {
  AccumulationAnnotationService,
  AccumulationChartModule,
  AccumulationDataLabelService,
  AccumulationLegendService,
  AccumulationTooltipService,
  PieSeriesService,
} from '@syncfusion/ej2-angular-charts';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../../services/language.service';
import { Language } from '../../../models/language.model';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    AccumulationChartModule,
    AutoCompleteModule,
    DropDownListModule,
    MultiSelectModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    PieSeriesService,
    AccumulationLegendService,
    AccumulationTooltipService,
    AccumulationDataLabelService,
    AccumulationAnnotationService,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit {
  @ViewChild('multiselect') multiselect!: MultiSelectComponent;

  languageData: string[] = [];
  selectedLanguages: string[] = [];
  title: string = 'Searched languages repository counts';
  pieData: Object[] = [];
  maxSelection = 3;
  tooltip = {
    enable: true,
  };

  constructor(
    private repoService: RepoService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.fetchLanguages();
  }

  fetchLanguages() {
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        this.languageData = data.map((item: Language) => item.name);
      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      },
    });
  }

  fetchRepoCounts(languages: string[]): void {
    this.repoService.getRepoCounts(languages).subscribe({
      next: (response: any[]) => {
        this.pieData = response.map((repo) => ({
          x: repo.language,
          y: repo.count,
        }));
      },
      error: (error: any) => {
        console.error('Error fetching repository counts', error);
      },
    });
  }

  onSearch() {
    const selectedItems = this.multiselect.value as string[];

    if (selectedItems && selectedItems.length === 3) {
      this.selectedLanguages = selectedItems;
      this.fetchRepoCounts(selectedItems);
    }
  }
}
