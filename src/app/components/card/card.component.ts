import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RepoService } from '../../services/repo.service';
import { RepoInViewDirective } from '../../directives/repo-in-view.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RepoInViewDirective, LoadingSpinnerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
  @ViewChild('card') card: ElementRef | undefined;

  repos: any[] = [];
  private repoSubscription: Subscription | undefined;

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.fetchRepositories();
  }

  fetchRepositories(): void {
    this.repoSubscription = this.repoService
      .getRepositories()
      .subscribe((newRepos) => {
        if (this.repoService.searchSource === 'filter') this.scrollToTop();
        this.repos = newRepos;
      });
  }

  ngOnDestroy(): void {
    if (this.repoSubscription) {
      this.repoSubscription.unsubscribe();
    }
  }

  loadRepos() {
    this.repoService.fetchNextPage();
  }

  scrollToTop(): void {
    if (this.card) {
      this.card.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
}
