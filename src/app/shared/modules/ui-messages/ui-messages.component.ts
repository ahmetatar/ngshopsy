import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject} from '@angular/core';
import {AsyncPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {UiMessage} from './ui-messages.contracts';
import {UiMessagesService} from './ui-messages.service';
import {DEFAULT_UI_MESSAGE_OPTIONS, UI_MESSAGE_OPTIONS, UiMessageOptions} from './ui-messages.options';
import {UiMessageComponentContext} from './ui-messages.component.context';

@Component({
  selector: 'ngs-ui-messages',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, AsyncPipe],
  providers: [{provide: UI_MESSAGE_OPTIONS, useValue: DEFAULT_UI_MESSAGE_OPTIONS}],
  template: `
    <ng-container *ngIf="messages$ | async as messages">
      <div class="container">
        <div
          *ngFor="let message of messages"
          role="alert"
          data-testid="alert-container"
          [ngClass]="[
            'alert align-items-center fade show',
            'alert-' + message.messageType,
            options?.dismissible ? 'alert-dismissible' : ''
          ]"
        >
          <h4 class="alert-heading">{{ message.title }}</h4>
          <p class="mb-0">{{ message.text }}</p>
          <button
            *ngIf="options?.dismissible"
            role="button"
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            (click)="onMessageRemove(message.id!)"
          ></button>
        </div>
      </div>
    </ng-container>
  `,
  styles: [
    `
      .container {
        max-width: none;
        padding: 0;

        .alert {
          margin-bottom: 0.5rem;
        }
      }

      .clear-messages {
        cursor: pointer;
        max-width: fit-content;
        border: 1px solid #ccc;
        padding: 0.2rem 1rem 0.2rem 1rem;
        border-radius: 1rem;
        margin-bottom: 1rem;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiMessagesComponent implements UiMessageComponentContext {
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
}
