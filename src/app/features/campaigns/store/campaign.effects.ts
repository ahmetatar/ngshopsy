import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CampaignApiActions} from './campaign.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {CampaignService} from '../campaign.service';

@Injectable()
export class CampaignEffects {
  /**
   * Persists created campaign
   */
  saveCampaign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampaignApiActions.createCampaign),
      exhaustMap(({campaign}) =>
        this.campaignService.saveCampaign(campaign).pipe(
          map(() => CampaignApiActions.campaignCreated()),
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
    private campaignService: CampaignService,
    private actions$: Actions,
  ) {}
}
