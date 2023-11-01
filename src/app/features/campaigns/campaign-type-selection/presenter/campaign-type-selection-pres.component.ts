import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SvgDirective} from '@shared/directives';
import {CampaignTypeComponent} from '../sub-components/campaign-type/campaign-type.component';
import {CAMPAIGN_TYPES_OPTIONS, DEFAULT_CAMPAIGN_TYPES_OPTIONS} from './campaign-type-selection-pres.options';

@Component({
  selector: 'ngs-campaign-type-selection-pres',
  standalone: true,
  imports: [CommonModule, SvgDirective, CampaignTypeComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: CAMPAIGN_TYPES_OPTIONS, useValue: DEFAULT_CAMPAIGN_TYPES_OPTIONS}],
  template: `<div class="card-group">
    <ngs-campaign-type
      *ngFor="let campaignType of campaignTypes"
      class="card"
      [title]="campaignType.title"
      [text]="campaignType.text"
      [cardImage]="campaignType.image"
      [cardButton]="campaignType.button"
    ></ngs-campaign-type>
  </div>`,
})
export class CampaignTypeSelectionPresComponent {
  campaignTypes = inject(CAMPAIGN_TYPES_OPTIONS).campaignTypes;
}
