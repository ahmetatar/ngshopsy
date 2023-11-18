import {Meta, StoryObj, applicationConfig, argsToTemplate, moduleMetadata} from '@storybook/angular';
import {CampaignAdGroupPresComponent} from './campaign-ad-group-pres.component';
import {ProductPresComponent} from '@shared/modules/product';
import {provideHttpClient} from '@angular/common/http';
import {provideSvgImage} from '@core/svg-utils';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PRODUCT_MOCKS} from '@shared/modules/product/testing';

export default {
  title: 'Features/Campaigns/Campaign Ad Group',
  component: CampaignAdGroupPresComponent,
  argTypes: {adGroupUpdated: {action: 'submitted'}},
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideSvgImage({
          path: '/images.storybook.json',
        }),
      ],
    }),
    moduleMetadata({
      imports: [ProductPresComponent, ReactiveFormsModule, FormsModule],
    }),
  ],
  render: (args: CampaignAdGroupPresComponent) => {
    return {
      props: {
        ...args,
      },
      template: `<ngs-campaign-ad-group-pres ${argsToTemplate(args)} />`,
    };
  },
} as Meta<CampaignAdGroupPresComponent>;

/** Default component story type */
type Story = StoryObj<CampaignAdGroupPresComponent>;

/** Default story */
export const Primary: Story = {
  args: {
    availableProducts: PRODUCT_MOCKS,
  },
};
