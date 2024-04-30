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
  @Output() cardInView: EventEmitter<void> = new EventEmitter<void>();

  private intersectionObserver: IntersectionObserver | undefined;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.cardInView.emit();
        }
      });
    });

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }
}
