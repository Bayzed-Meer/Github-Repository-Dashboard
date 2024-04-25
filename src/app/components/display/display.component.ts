import { Component } from '@angular/core';

import { CardComponent } from '../card/card.component';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [CardComponent, GridComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
})
export class DisplayComponent {}
