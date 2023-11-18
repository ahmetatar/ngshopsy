import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {CampaignActions, CampaignState, selectActiveCampaign} from '@features/campaigns/store';
import {ActivatedRoute, Router} from '@angular/router';
import {CampaignDetailsPresComponent} from '../presenter/campaign-details-pres.component';
import {Campaign} from '@features/campaigns/campaigns.model';

@Component({
  selector: 'ngs-campaign-details-cont',
  standalone: true,
  imports: [CampaignDetailsPresComponent],
  template: `<ngs-campaign-details-pres (formSubmitted)="onSubmitForm($event)" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailsContComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store<CampaignState>);
  private readonly route = inject(ActivatedRoute);

  onSubmitForm(campaign: Campaign) {
    this.store.pipe(selectActiveCampaign).subscribe((editingCampaing) => {
      this.store.dispatch(
        CampaignActions.setCampaignDetails({
          campaign: {
            ...editingCampaing,
            ...campaign,
          },
        }),
      );
      this.router.navigate(['../ad-group'], {relativeTo: this.route});
    });
  }
}
