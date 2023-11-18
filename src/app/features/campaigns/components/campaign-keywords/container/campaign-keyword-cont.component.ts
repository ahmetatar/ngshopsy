import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CampaignKeywordPresComponent} from '../presenter';
import {Keyword} from '@features/campaigns/campaigns.model';
import {Store} from '@ngrx/store';
import {CampaignActions, CampaignApiActions, CampaignState, selectActiveCampaign} from '@features/campaigns/store';
import {nonNullable} from '@core/utils';

@Component({
  selector: 'ngs-campaign-keyword-cont',
  standalone: true,
  imports: [CampaignKeywordPresComponent],
  template: `<ngs-campaign-keyword-pres (keywordsAdded)="onKeywordsAdded($event)" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CampaignKeywordContComponent {
  private readonly store: Store<CampaignState> = inject(Store<CampaignState>);

  onKeywordsAdded(keywords: (Keyword | null)[]) {
    this.store.pipe(selectActiveCampaign).subscribe((editingCampaing) => {
      if (nonNullable<Keyword[]>(keywords)) {
        this.store.dispatch(
          CampaignActions.setKeywords({
            campaign: {
              ...editingCampaing,
              adGroups: [{...editingCampaing.adGroups?.[0]!, keywords}],
            },
          }),
        );
        this.store.dispatch(CampaignApiActions.createCampaign());
      }
    });
  }
}
