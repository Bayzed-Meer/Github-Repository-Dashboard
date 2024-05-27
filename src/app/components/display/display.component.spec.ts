import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayComponent } from './display.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RepositoryService } from '../../services/repository.service';
import { FilterService } from '../../services/filter.service';

xdescribe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;

  let repositoryService: RepositoryService;
  let filterService: FilterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, DisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;

    repositoryService = TestBed.inject(RepositoryService);
    filterService = TestBed.inject(FilterService);

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch repositories on initialization if no repositories exist', () => {
    jest.spyOn(component as any, 'fetchRepositories');
    component.ngOnInit();
    expect((component as any).fetchRepositories).toHaveBeenCalled();
  });

  it('should fetch repositories when calling fetchRepositories', () => {
    jest
      .spyOn(repositoryService, 'fetchRepositories')
      .mockReturnValue(of({ total_count: 100, items: [] }));
    component.fetchRepositories();
    expect(repositoryService.fetchRepositories).toHaveBeenCalled();
  });
});
