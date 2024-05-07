import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { RepoService } from '../../services/repo.service';
import { GridModule } from '@syncfusion/ej2-angular-grids';
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
  @ViewChild('grid') grid: ElementRef | undefined;

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
        newRepos.forEach((repo, index) => {
          repo.rowIndex = index + 1;
        });
        this.repos = newRepos;
      });
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
