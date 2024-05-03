import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appRepoInView]',
  standalone: true,
})
export class RepoInViewDirective implements OnInit, OnDestroy {
  @Output() targetInview: EventEmitter<void> = new EventEmitter<void>();

  private intersectionObserver: IntersectionObserver | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initializeIntersectionObserver();
  }

  initializeIntersectionObserver(): void {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.targetInview.emit();
        });
      },
      {
        rootMargin: '0px 0px 1000px 0px',
      }
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
