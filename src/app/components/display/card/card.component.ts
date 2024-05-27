import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoInViewDirective } from '../../../directives/repo-in-view.directive';
import { LoadingSpinnerComponent } from '../../loading-spinner/loading-spinner.component';
import { Repository } from '../../../models/repository.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RepoInViewDirective, LoadingSpinnerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() repositories: Repository[] = [];
  @Output() loadMoreRepositories = new EventEmitter<void>();

  loadMore(): void {
    this.loadMoreRepositories.emit();
  }
}
