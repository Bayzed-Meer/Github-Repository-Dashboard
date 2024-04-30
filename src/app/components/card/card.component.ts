import { Component, OnDestroy, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RepoInViewDirective } from '../../directives/repo-in-view.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RepoInViewDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnDestroy {
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
        if (this.repoService.searchSource === 'filter') {
          this.repos = newRepos;
          this.scrollToTop();
        } else {
          this.repos = [...this.repos, ...newRepos];
        }
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
