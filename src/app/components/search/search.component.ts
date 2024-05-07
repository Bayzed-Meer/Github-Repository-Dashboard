import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../services/language.service';
import { FilterService } from '../../services/filter.service';
import { Language } from '../../models/language.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule, DropDownListModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  languageData: string[] = [];
  orderData: string[] = ['asc', 'desc'];
  selectedLanguage: string = 'JavaScript';
  selectedOrder: string = 'desc';

  constructor(
    private languageService: LanguageService,
    private filterService: FilterService
  ) {}

  ngOnInit() {
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

  onSearch() {
    this.filterService.setFilters(this.selectedLanguage, this.selectedOrder);
  }
}
