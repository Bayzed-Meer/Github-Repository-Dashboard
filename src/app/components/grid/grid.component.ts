import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { Subscription } from 'rxjs';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [GridModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
})
export class GridComponent {
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

  onClick(url: string): void {
    window.open(url);
  }
}
