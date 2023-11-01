import {Meta, moduleMetadata} from '@storybook/angular';
import {UiMessagesComponent} from './ui-messages.component';
import {CommonModule} from '@angular/common';
import {UiMessageCloseDirective} from './ui-message-close.directive';
import {provideMockStore} from '@ngrx/store/testing';
import {UiMessagesService} from './ui-messages.service';
import {BehaviorSubject} from 'rxjs';
import {MessageType, UiMessage} from './ui-messages.contracts';
import {action} from '@storybook/addon-actions';

/**
 * Message subject to replace message store
 */
const messagesSubject = new BehaviorSubject<UiMessage[]>([
  {
    id: '1',
    title: 'File download',
    text: 'Download completed successfully!',
    messageType: MessageType.Success,
  },
  {
    id: '2',
    title: 'Opps! An error occured.',
    text: 'An error occured while downloding file. Try again later.',
    messageType: MessageType.Error,
  },
]);

/**
 * Mock implementation for UiMessageService
 */
const mockUiMessageService = {
  messages$: messagesSubject.asObservable(),
  clearMessages: () => messagesSubject.next([]),
  removeMessage: () => {},
};

/**
 * Storybook actions to bind component events
 */
const actions = {
  onMessageClosed: action('onMessageClosed'),
};

export default {
  title: 'Shared/UI Messages',
  component: UiMessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UiMessageCloseDirective],
      providers: [provideMockStore(), {provide: UiMessagesService, useValue: mockUiMessageService}],
    }),
  ],
} as Meta<UiMessagesComponent>;

/**
 * Default story
 */
export const Primary = {
  render: (args: UiMessagesComponent) => ({
    props: args,
  }),
};

/**
 * Dismissible alert box story
 */
export const Dismissible = {
  render: (args: UiMessagesComponent) => ({
    props: {
      ...args,
      onMessageClosed: actions.onMessageClosed,
    },
  }),
  args: {
    options: {
      dismissible: true,
    },
  },
  parameters: {
    controls: {
      exclude: ['onMessageClosed'],
    },
  },
};
