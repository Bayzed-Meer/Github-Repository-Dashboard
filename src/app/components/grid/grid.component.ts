import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { RepoInViewDirective } from '../../directives/repo-in-view.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [
    GridModule,
    CommonModule,
    RepoInViewDirective,
    LoadingSpinnerComponent,
  ],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() repositories$!: Observable<Repository[]>;
  @Output() loadMoreRepositoriesEvent = new EventEmitter<void>();

  protected gridInitialized = false;

  protected onGridDataBound(): void {
    this.gridInitialized = true;
  }

  protected openRepository(url: string): void {
    window.open(url);
  }
}
