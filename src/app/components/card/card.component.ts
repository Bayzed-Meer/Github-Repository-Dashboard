import { Component, OnDestroy, OnInit } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
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
      .subscribe((repos) => {
        this.repos = repos;
      });
  }

  ngOnDestroy(): void {
    if (this.repoSubscription) {
      this.repoSubscription.unsubscribe();
    }
  }
}
