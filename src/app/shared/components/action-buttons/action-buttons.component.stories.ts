import {Meta, StoryObj, argsToTemplate} from '@storybook/angular';
import {ActionButtonsComponent} from './action-buttons.component';
import {DEFAULT_ACTION_BUTTONS} from './action-buttons.options';

export default {
  title: 'Shared/Components/Action Buttons',
  component: ActionButtonsComponent,
  argTypes: {buttonClicked: {action: 'clicked'}},
  render: (args: ActionButtonsComponent) => {
    return {
      props: {
        ...args,
      },
      template: `<ngs-action-buttons ${argsToTemplate(args)} />`,
    };
  },
} as Meta<ActionButtonsComponent>;

/** Default component story type */
type Story = StoryObj<ActionButtonsComponent>;

/** Default story */
export const Primary: Story = {
  args: {
    options: {
      useStack: true,
    },
    buttons: DEFAULT_ACTION_BUTTONS,
  },
};
