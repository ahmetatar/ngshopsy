import {Meta, moduleMetadata} from '@storybook/angular';
import {UiMessagesComponent} from './ui-messages.component';
import {CommonModule} from '@angular/common';
import {provideMockStore} from '@ngrx/store/testing';
import {action} from '@storybook/addon-actions';
import {selectMessages} from './store';
import {mockMessages} from './ui-messages.component.mocks';
import {UiMessagesService} from './ui-messages.service';

/**
 * Storybook actions to bind component events
 */
const actions = {
  onMessageRemove: action('onMessageRemove'),
};

export default {
  title: 'Shared/Modules/UI Messages',
  component: UiMessagesComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      providers: [
        UiMessagesService,
        provideMockStore({
          selectors: [{selector: selectMessages, value: mockMessages}],
        }),
      ],
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
      onMessageRemove: actions.onMessageRemove,
    },
  }),
  args: {
    options: {
      dismissible: true,
    },
  },
};
