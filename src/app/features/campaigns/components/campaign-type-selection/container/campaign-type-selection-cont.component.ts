import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CampaignTypeSelectionPresComponent} from '../presenter';
import {CAMPAIGN_TYPES_OPTIONS} from './campaign-type-selection-cont.options';
import {mockCampaignTypes} from '../mocks';
import {CampaignType, CardButton} from '../sub-components/campaign-type';
import {CampaignActions, CampaignState, selectEditingCampaign} from '@features/campaigns/store';
import {Store, select} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs';

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
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly store: Store<CampaignState> = inject(Store<CampaignType>);
  public readonly campaignTypes = inject(CAMPAIGN_TYPES_OPTIONS).campaignTypes;

  onCampaignSelected({campaignType, url}: CardButton) {
    this.store.pipe(select(selectEditingCampaign), take(1)).subscribe((campaign) => {
      if (!campaign || (campaign && campaign.id)) {
        this.store.dispatch(CampaignActions.setCampaignType({id: campaign?.id, campaignType}));
      }
    });
    this.router.navigate([url], {relativeTo: this.route});
  }
}
