import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[svg]',
  standalone: true,
})
export class MockSvgDirective {
  @Input()
  public svg: string = '';
}
