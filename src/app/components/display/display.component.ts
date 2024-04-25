import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CardComponent, GridComponent, CommonModule],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {
  showCard: boolean = true;

  toggleView(): void {
    this.showCard = !this.showCard;
  }
}
