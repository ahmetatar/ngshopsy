import {TestBed, inject} from '@angular/core/testing';
import {ActionsSubject} from '@ngrx/store';
import {CampaignServiceFixture} from '../testing';
import {CampaignEffects} from './campaign.effects';
import {CampaignService} from '../campaign.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Campaign} from '../campaigns.model';
import {selectEditingCampaign} from './campaign.selectors';
import {CampaignApiActions} from './campaign.actions';

describe('Campaign effects tests', () => {
  const actions$ = new ActionsSubject();
  const campaignServiceFixture = new CampaignServiceFixture();
  let campaignEffects: CampaignEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CampaignEffects,
        {provide: CampaignService, useValue: campaignServiceFixture},
        provideMockStore(),
        provideMockActions(() => actions$),
      ],
    });

    campaignEffects = TestBed.inject(CampaignEffects);
  });

  afterAll(() => jest.clearAllMocks());

  it('should save last editing campaign', inject([MockStore], (store: MockStore) => {
    const campaign: Partial<Campaign> = {id: '1', status: 'dirty'};
    store.overrideSelector(selectEditingCampaign, campaign as Campaign);

    actions$.next(CampaignApiActions.createCampaign());
  }));
});
