import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { Subscription } from 'rxjs';
import { RepoService } from '../../services/repo.service';
import { CommonModule } from '@angular/common';
import { RepoInViewDirective } from '../../directives/repo-in-view.directive';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

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
})
export class GridComponent {
  repos: any[] = [];
  repoSubscription: Subscription | undefined;
  intersectionObserver: IntersectionObserver | undefined;
  gridInitialized = false;

  constructor(private repoService: RepoService) {}

  ngOnInit(): void {
    this.fetchRepositories();
  }

  onGridDataBound(): void {
    this.gridInitialized = true;
  }

  fetchRepositories(): void {
    this.repoSubscription = this.repoService
      .getRepositories()
      .subscribe((newRepos) => {
        if (this.repoService.searchSource === 'filter') this.scrollToTop();
        newRepos.forEach((repo, index) => {
          repo.rowIndex = index + 1;
        });
        this.repos = newRepos;
        console.log(this.repos.length);
      });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnDestroy(): void {
    if (this.repoSubscription) {
      this.repoSubscription.unsubscribe();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  loadRepos() {
    this.repoService.fetchNextPage();
  }

  onClick(url: string): void {
    window.open(url);
  }
}
