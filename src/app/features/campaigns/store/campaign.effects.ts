import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CampaignApiActions} from './campaign.actions';
import {catchError, exhaustMap, map, of, switchMap, withLatestFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {CampaignService} from '../campaign.service';
import {CampaignState} from './campaign.state';
import {Store} from '@ngrx/store';
import {selectActiveCampaign} from './campaign.store.helpers';

@Injectable()
export class CampaignEffects {
  /**
   * Persists created campaign
   */
  saveCampaign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignApiActions.createCampaign),
      withLatestFrom(this.store.pipe(selectActiveCampaign)),
      exhaustMap(([_, campaign]) =>
        this.campaignService.saveCampaign(campaign).pipe(
          map(() => CampaignApiActions.campaignCreated({id: campaign.id!})),
          catchError((err: HttpErrorResponse) => of(CampaignApiActions.campaignCreatingError(err.error))),
        ),
      ),
    ),
  );

  /**
   * Updates state by loading all campaigns
   */
  loadCampaigns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignApiActions.loadCampaigns),
      switchMap(() =>
        this.campaignService.getCampaigns().pipe(
          map((campaigns) => CampaignApiActions.campaignsLoaded({campaigns})),
          catchError((err: HttpErrorResponse) => of(CampaignApiActions.campaignsLoadError(err.error))),
        ),
      ),
    ),
  );

  constructor(
    private readonly store: Store<CampaignState>,
    private readonly campaignService: CampaignService,
    private readonly actions$: Actions,
  ) {}
}
