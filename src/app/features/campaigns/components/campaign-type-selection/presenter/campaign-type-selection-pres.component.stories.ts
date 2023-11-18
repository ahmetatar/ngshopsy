import {Meta, StoryObj, applicationConfig} from '@storybook/angular';
import {CampaignTypeSelectionPresComponent} from './campaign-type-selection-pres.component';
import {provideHttpClient} from '@angular/common/http';
import {provideSvgImage} from '@core/svg-utils';
import {provideRouter} from '@angular/router';
import {mockCampaignTypes} from '../mocks';

export default {
  title: 'Features/Campaigns/Campaign Selection',
  component: CampaignTypeSelectionPresComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideSvgImage({
          path: '/images.storybook.json',
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
      ...mockCampaignTypes,
    },
  }),
};
