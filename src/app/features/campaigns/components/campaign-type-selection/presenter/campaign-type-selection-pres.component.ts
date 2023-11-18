import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {NgFor} from '@angular/common';
import {CampaignType, CampaignTypeComponent, CardButton} from '../sub-components/campaign-type';

@Component({
  selector: 'ngs-campaign-type-selection-pres',
  standalone: true,
  imports: [NgFor, CampaignTypeComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="card-group">
    <ngs-campaign-type
      *ngFor="let campaignType of campaignTypes"
      class="card"
      [campaignType]="campaignType"
      (campaignTypeButtonClicked)="campaignTypeSelected.emit($event)"
    ></ngs-campaign-type>
  </div>`,
})
export class CampaignTypeSelectionPresComponent {
  @Input()
  campaignTypes: CampaignType[] = [];

  @Output()
  campaignTypeSelected = new EventEmitter<CardButton>();
}
