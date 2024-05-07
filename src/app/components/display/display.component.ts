import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CardComponent, GridComponent, CommonModule, SearchComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  showCard: boolean = true;

  toggleView(): void {
    this.showCard = !this.showCard;
  }
}
