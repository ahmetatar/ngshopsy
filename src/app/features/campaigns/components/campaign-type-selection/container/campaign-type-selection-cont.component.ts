import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CampaignTypeSelectionPresComponent} from '../presenter';
import {CAMPAIGN_TYPES_OPTIONS} from './campaign-type-selection-cont.options';
import {mockCampaignTypes} from '../mocks';
import {CampaignType, CardButton} from '../sub-components/campaign-type';
import {CampaignActions, CampaignState} from '@features/campaigns/store';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';

@Component({
  selector: 'ngs-campaign-type-selection-cont',
  standalone: true,
  imports: [CampaignTypeSelectionPresComponent],
  providers: [{provide: CAMPAIGN_TYPES_OPTIONS, useValue: mockCampaignTypes}],
  template: `<ngs-campaign-type-selection-pres
    [campaignTypes]="campaignTypes"
    (campaignTypeSelected)="onCampaignSelected($event)"
  />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignTypeSelectionContComponent {
  router = inject(Router);
  store: Store<CampaignState> = inject(Store<CampaignType>);
  campaignTypes = inject(CAMPAIGN_TYPES_OPTIONS).campaignTypes;

  onCampaignSelected({campaignType, url}: CardButton) {
    this.store.dispatch(CampaignActions.setCampaignType({campaignType}));
    this.router.navigateByUrl(url);
  }
}
