import {Directive, ElementRef, Input, inject} from '@angular/core';
import {SvgImageService} from '@core/svg-utils';

@Directive({
  //eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[svg]',
  standalone: true,
})
export class SvgDirective {
  private svgImageService = inject(SvgImageService);
  private elementRef = inject(ElementRef);

  @Input()
  public svg: string = '';

  ngOnInit() {
    this.svgImageService.loadSvg(this.svg).subscribe((content) => {
      (this.elementRef.nativeElement as HTMLElement).innerHTML = content ?? '';
    });
  }
}
