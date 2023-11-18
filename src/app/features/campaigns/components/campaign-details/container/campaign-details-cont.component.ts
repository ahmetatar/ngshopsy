import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Store, select} from '@ngrx/store';
import {CampaignActions, CampaignState, selectUpdatingCampaignId} from '@features/campaigns/store';
import {CampaignDetailsPresComponent} from '../presenter';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs';
import {Campaign} from '@features/campaigns';

@Component({
  selector: 'ngs-campaign-details-cont',
  standalone: true,
  imports: [CommonModule, CampaignDetailsPresComponent],
  template: `<ngs-campaign-details-pres (formSubmitted)="onSubmitForm($event)" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailsContComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store<CampaignState>);
  private readonly route = inject(ActivatedRoute);

  onSubmitForm(campaign: Campaign) {
    this.store
      .pipe(
        select(selectUpdatingCampaignId),
        filter((id): id is string => !!id),
      )
      .subscribe((id) => {
        this.store.dispatch(CampaignActions.setCampaignDetails({id, entity: campaign}));
        this.router.navigate([id, 'ad-group'], {relativeTo: this.route});
      });
  }
}
