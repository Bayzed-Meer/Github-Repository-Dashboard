import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../models/language.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AutoCompleteModule, FormsModule, DropDownListModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  languageData: [] = [];
  sortData: string[] = ['asc', 'desc'];
  selectedLanguage: string = 'javaScript';
  sort: string = 'asc';
  showError: boolean = false;

  @Output() searchFilters = new EventEmitter<any>();

  constructor(private languageService: LanguageService) {}

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
    if (this.selectedLanguage === null) this.showError = true;
    else {
      this.showError = false;
      this.searchFilters.emit({
        language: this.selectedLanguage,
        sort: this.sort,
      });
    }
  }
}
