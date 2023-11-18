import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[ngsModalTrigger]',
  standalone: true,
})
export class ModalTriggerDirective {
  /**
   * It adds id value with data-bs-target='#id' attribute to host element
   */
  @HostBinding('attr.data-bs-target')
  @Input('ngsModalTrigger')
  target = '';

  /**
   * It adds data-bs-toggle=''
   */
  @HostBinding('attr.data-bs-toggle') toggle = 'modal';
}
