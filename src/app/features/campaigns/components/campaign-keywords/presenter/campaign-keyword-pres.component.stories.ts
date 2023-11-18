import {Meta, StoryObj, applicationConfig} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {CampaignKeywordPresComponent} from './campaign-keyword-pres.component';

export default {
  title: 'Features/Campaigns/Campaign Keywords',
  component: CampaignKeywordPresComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()],
    }),
  ],
  render: (args: CampaignKeywordPresComponent) => ({
    props: {
      ...args,
    },
    template: ``,
  }),
} as Meta<CampaignKeywordPresComponent>;

/** Default component story type */
type Story = StoryObj<CampaignKeywordPresComponent>;

/** Default story */
export const Primary: Story = {
  args: {},
};
