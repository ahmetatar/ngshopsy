import {Meta, StoryObj} from '@storybook/angular';
import {CampaignDetailsPresComponent} from './campaign-details-pres.component';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export default {
  title: 'Features/Campaigns/Campaign Details',
  component: CampaignDetailsPresComponent,
} as Meta<CampaignDetailsPresComponent>;

/** Default component story type */
type Story = StoryObj<CampaignDetailsPresComponent>;

/** Default story */
export const Primary: Story = {
  render: (args: CampaignDetailsPresComponent) => ({
    props: {
      ...args,
    },
  }),
};

/** Invalid form story */
export const InvalidForm: Story = {
  render: (args: CampaignDetailsPresComponent) => {
    const form = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        budget: new FormControl(0, [Validators.min(1)]),
        startDate: new FormControl(),
        endDate: new FormControl(),
        indefiniteCampaign: new FormControl(false),
      },
      {
        validators: () => {
          return {invalidDates: true};
        },
      },
    );

    form.controls.name.markAsTouched();
    form.controls.startDate.markAsTouched();
    form.controls.budget.markAsTouched();

    return {
      props: {
        ...args,
        form,
      },
    };
  },
};
