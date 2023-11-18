import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[ngsModalDismiss]',
  standalone: true,
})
export class ModalDismissDirective {
  /**
   * It adds data-bs-dismiss='modal' attribute to host element
   */
  @HostBinding('attr.data-bs-dismiss') dismiss = 'modal';
}
