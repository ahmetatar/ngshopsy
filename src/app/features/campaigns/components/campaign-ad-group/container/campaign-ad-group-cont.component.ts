import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import {CampaignAdGroupPresComponent} from '../presenter';
import {ActivatedRoute, Router} from '@angular/router';
import {Product, selectProducts} from '@shared/modules/product';
import {Observable, take} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {CampaignActions, CampaignState, selectActiveCampaign} from '@features/campaigns/store';
import {AdGroup} from '@features/campaigns';

@Component({
  selector: 'ngs-campaign-ad-group-cont',
  standalone: true,
  imports: [NgIf, AsyncPipe, CampaignAdGroupPresComponent],
  template: `<ng-container *ngIf="products$ | async as products">
    <ngs-campaign-ad-group-pres [availableProducts]="products" (adGroupUpdated)="onAdGroupUpdated($event)" />
  </ng-container>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignAdGroupContComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly store: Store<CampaignState> = inject(Store<CampaignState>);

  /** Loaded available products for ad group creation */
  products$: Observable<Product[]>;

  constructor() {
    this.products$ = this.store.pipe(select(selectProducts), take(1));
  }

  /**
   * Handler to update ad group of campaign
   *
   * @param adGroup updated ad group
   */
  onAdGroupUpdated(adGroup: AdGroup) {
    this.store.pipe(selectActiveCampaign).subscribe((editingCampaign) => {
      this.store.dispatch(
        CampaignActions.setAdGroup({
          campaign: {
            ...editingCampaign,
            adGroups: [adGroup],
          },
        }),
      );
      this.router.navigate(['../keywords'], {relativeTo: this.route});
    });
  }
}
