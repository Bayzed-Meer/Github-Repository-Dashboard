import { RepoInViewDirective } from './repo-in-view.directive';
import { ElementRef } from '@angular/core';

xdescribe('RepoInViewDirective', () => {
  let mockElementRef: ElementRef<HTMLElement>;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('div'));
  });

  it('should create an instance', () => {
    const directive = new RepoInViewDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
