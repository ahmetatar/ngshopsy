import {Meta, StoryObj, argsToTemplate, moduleMetadata} from '@storybook/angular';
import {ModalComponent} from './modal.component';
import {ModalTriggerDirective} from './modal-trigger.directive';
import {ModalDismissDirective} from './modal-dismiss.directive';

export default {
  title: 'Shared/Components/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ModalTriggerDirective, ModalDismissDirective],
    }),
  ],
  render: (args: ModalComponent) => {
    return {
      props: {
        ...args,
      },
      template: `
        <button type="button" class="btn btn-primary" ngsModalTrigger="#testModal">
          Launch demo modal
        </button>
        <ngs-modal ${argsToTemplate(args)}>
          <ng-container header>
            <h5 class="modal-title" id="testModal">Are you sure?</h5>
            <button type="button" class="btn-close" ngsModalDismiss aria-label="Close"></button>
          </ng-container>
          <ng-container body>
            This is a test
          </ng-container>
          <ng-container footer>
            <button type="button" class="btn btn-secondary" ngsModalDismiss>Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </ng-container>
        </ngs-modal>`,
    };
  },
} as Meta<ModalComponent>;

/** Default component story type */
type Story = StoryObj<ModalComponent>;

/** Default story */
export const Primary: Story = {
  args: {
    modalId: 'testModal',
  },
};
