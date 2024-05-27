import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { CardComponent } from './card.component';
import { Repository } from '../../../models/repository.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input property repositories', () => {
    component.repositories = mockRepositories;
    expect(component.repositories).toBeDefined();
  });

  it('should have output property loadMoreRepositoriesEvent', () => {
    expect(component.loadMoreRepositories).toBeDefined();
  });

  it('should set repositories', () => {
    component.repositories = mockRepositories;
    expect(component.repositories.length).toEqual(1);
  });

  it('should emit loadMoreRepositories when loadMore is called', () => {
    const loadMoreRepositoriesSpy = jest.spyOn(
      component.loadMoreRepositories,
      'emit'
    );
    component.loadMore();
    expect(loadMoreRepositoriesSpy).toHaveBeenCalled();
  });
});
