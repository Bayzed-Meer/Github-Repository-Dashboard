import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { DisplayComponent } from './components/display/display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    SearchComponent,
    DisplayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Github-Repository-Dashboard';
  searchFilters: any;

  receiveSearchFilters(filters: any) {
    this.searchFilters = filters;
  }
}
