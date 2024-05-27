import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { FilterService } from '../../services/filter.service';
import { Language } from '../../models/language.model';
import {
  AutoCompleteModule,
  DropDownListModule,
} from '@syncfusion/ej2-angular-dropdowns';
import { Observable, catchError, map, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, AutoCompleteModule, FormsModule, DropDownListModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  languages$!: Observable<string[]>;
  sortOrders: string[] = ['asc', 'desc'];
  selectedLanguage: string = 'Javascript';
  selectedSortOrder: string = 'desc';

  constructor(
    private languageService: LanguageService,
    private filterService: FilterService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.fetchLanguages();
  }

  fetchLanguages(): void {
    this.languages$ = this.languageService.fetchLanguages().pipe(
      map((languages: Language[]) =>
        languages.map((language) => language.name)
      ),
      catchError((error) => {
        console.error('Failed to fetch languages...', error);
        return of([]);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  searchRepositories(language: string, sortOrder: string): void {
    this.filterService.setFilters({ language, sortOrder });
  }
}
