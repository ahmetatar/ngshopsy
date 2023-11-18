import {Meta, StoryObj, applicationConfig, argsToTemplate, moduleMetadata} from '@storybook/angular';
import {ProductPresComponent} from '@shared/modules/product';
import {provideHttpClient} from '@angular/common/http';
import {provideSvgImage} from '@core/svg-utils';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CampaignListPresComponent} from './campaign-list-pres.component';

export default {
  title: 'Features/Campaigns/Campaign List',
  component: CampaignListPresComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideSvgImage({
          path: '/images.json',
        }),
      ],
    }),
    moduleMetadata({
      imports: [ProductPresComponent, ReactiveFormsModule, FormsModule],
    }),
  ],
  render: (args: CampaignListPresComponent) => {
    return {
      props: {
        ...args,
      },
      template: `<ngs-campaign-list-pres ${argsToTemplate(args)} />`,
    };
  },
} as Meta<CampaignListPresComponent>;

/** Default component story type */
type Story = StoryObj<CampaignListPresComponent>;

/** Default story */
export const Primary: Story = {
  args: {},
};
