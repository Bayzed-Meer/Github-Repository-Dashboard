import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { GridComponent } from './grid.component';
import { Repository } from '../../../models/repository.model';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  const mockRepositories: Repository[] = [
    {
      name: 'Repo 1',
      description: 'Description 1',
      language: 'TypeScript',
      stargazers_count: 10,
      forks_count: 5,
      updated_at: '2024-05-20',
      owner: {
        login: 'owner1',
      },
      html_url: 'https://github.com/repo1',
    },
  ];

  const mockRepositories$: Observable<Repository[]> = of(mockRepositories);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridComponent], 
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input property repositories', () => {
    component.repositories$ = mockRepositories$;
    expect(component.repositories$).toBeDefined();
  });

  it('should have output property loadMoreRepositoriesEvent', () => {
    expect(component.loadMoreRepositoriesEvent).toBeDefined();
  });
});
