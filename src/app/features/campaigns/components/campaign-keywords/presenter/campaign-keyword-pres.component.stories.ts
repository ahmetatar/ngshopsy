import {Meta, StoryObj, moduleMetadata} from '@storybook/angular';
import {CampaignKeywordPresComponent} from './campaign-keyword-pres.component';
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CampaignKeywordItemComponent} from '../sub-components';

export default {
  title: 'Features/Campaigns/Campaign Keywords',
  component: CampaignKeywordPresComponent,
  argTypes: {keywordsAdded: {action: 'added'}},
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, CampaignKeywordItemComponent],
    }),
  ],
} as Meta<CampaignKeywordPresComponent>;

/** Default component story type */
type Story = StoryObj<CampaignKeywordPresComponent>;

/**
 * Default story
 */
export const Primary: Story = {
  render: (args: CampaignKeywordPresComponent) => ({
    props: {
      ...args,
      form: new FormGroup({
        keywords: new FormArray([
          new FormControl({keyword: 'reusable bags 1', bid: 500, matchType: 1}),
          new FormControl({keyword: 'reusable bags 2', bid: 100, matchType: 2}),
        ]),
      }),
    },
  }),
};
