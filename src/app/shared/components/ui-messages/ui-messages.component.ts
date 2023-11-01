import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from 'rxjs';
import {UiMessage} from './ui-messages.contracts';
import {UiMessageCloseDirective} from './ui-message-close.directive';
import {UiMessagesService} from './ui-messages.service';
import {DEFAULT_UI_MESSAGE_OPTIONS, UI_MESSAGE_OPTIONS, UiMessageOptions} from './ui-messages.options';

@Component({
  selector: 'ngs-ui-messages',
  standalone: true,
  imports: [CommonModule, UiMessageCloseDirective],
  providers: [{provide: UI_MESSAGE_OPTIONS, useValue: DEFAULT_UI_MESSAGE_OPTIONS}],
  template: `
    <ng-container *ngIf="messages$ | async as messages">
      <div *ngIf="messages.length" class="clear-messages" (click)="onClearAllMessages()">Clear all</div>
      <div class="container">
        <div
          *ngFor="let message of messages"    
          messageClosed
          role="alert"
          [ngClass]="[
            'alert align-items-center fade show',
            'alert-' + message.messageType,
            options?.dismissible ? 'alert-dismissible' : ''
          ]"
          (closed)="onMessageRemove(message.id!)"
        >
          <h4 class="alert-heading">{{ message.title }}</h4>
          <p class="mb-0">{{ message.text }}</p>
          <button
            *ngIf="options?.dismissible"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./ui-messages.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMessagesComponent {
  private readonly globalOptions = inject(UI_MESSAGE_OPTIONS);
  private readonly messageService = inject(UiMessagesService);

  /**
   * Component options. It will be override global options
   */
  @Input()
  options: UiMessageOptions | undefined;

  /**
   * Holds all UI messages and refreshed every time new message is pushed
   */
  messages$!: Observable<UiMessage[]>;

  ngOnInit() {
    this.options = {
      ...this.globalOptions,
      ...this.options,
    };

    this.messages$ = this.messageService.messages$;
  }

  /**
   * Removes message entity from store
   * @param id message id
   */
  onMessageRemove(id: string) {
    this.messageService.removeMessage(id);
  }

  /**
   * Clears all messages
   */
  onClearAllMessages() {
    this.messageService.clearMessages();
  }
}
