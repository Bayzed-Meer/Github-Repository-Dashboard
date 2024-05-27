import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChartsComponent } from './charts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;

    const { getComputedStyle } = window;
    window.getComputedStyle = (elt) => getComputedStyle(elt);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
