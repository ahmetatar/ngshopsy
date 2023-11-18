import {Directive, Input} from '@angular/core';

@Directive({
  //eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[svg]',
  standalone: true,
})
export class MockSvgDirective {
  @Input()
  public svg: string = '';
}
