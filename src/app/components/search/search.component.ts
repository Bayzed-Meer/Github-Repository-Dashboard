import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.model';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule, DropDownListModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  languageData: string[] = [];
  orderData: string[] = ['asc', 'desc'];
  selectedLanguage: string = 'JavaScript';
  selectedOrder: string = 'desc';
  showError: boolean = false;

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
    if (!this.languageData.includes(this.selectedLanguage)) {
      this.showError = true;
    } else {
      this.showError = false;
      this.filterService.setFilters(this.selectedLanguage, this.selectedOrder);
    }
  }
}
