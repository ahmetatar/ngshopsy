import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[messageClosed]',
  standalone: true,
})
export class UiMessageCloseDirective {
  /**
   * Fires immediately when the close instance method is called
   */
  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  /**
   * Event listener for alert close.bs.alerts
   */
  @HostListener('close.bs.alert', ['$event']) onCloseMessage = () => this.closed.emit();
}
