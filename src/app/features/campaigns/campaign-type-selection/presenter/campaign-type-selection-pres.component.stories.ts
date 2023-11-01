import {Meta, StoryObj, applicationConfig} from '@storybook/angular';
import {CampaignTypeSelectionPresComponent} from './campaign-type-selection-pres.component';
import {provideHttpClient} from '@angular/common/http';
import {provideSvgImage} from '@core/svg-utils';

export default {
  title: 'Features/Campaigns/Campaign Selection',
  component: CampaignTypeSelectionPresComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideSvgImage({
          path: '/images.json',
        }),
      ],
    }),
  ],
} as Meta<CampaignTypeSelectionPresComponent>;

/** Default component story type */
type Story = StoryObj<CampaignTypeSelectionPresComponent>;

/** Default story */
export const Primary: Story = {
  render: (args: CampaignTypeSelectionPresComponent) => ({
    props: {
      ...args,
    },
  }),
};
