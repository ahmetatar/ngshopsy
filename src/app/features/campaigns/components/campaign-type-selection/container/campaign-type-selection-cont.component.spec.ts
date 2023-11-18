import {fireEvent, render, screen} from '@testing-library/angular';
import {CampaignTypeSelectionContComponent} from './campaign-type-selection-cont.component';
import {provideTestingSvgImage} from '@core/svg-utils/testing';
import {inject} from '@angular/core/testing';
import {Location} from '@angular/common';
import {MockBaseComponent} from '@core/testing';
import {provideMockStore} from '@ngrx/store/testing';

describe('CampaignTypeSelectionContComponent', () => {
  async function setupTest() {
    return await render(CampaignTypeSelectionContComponent, {
      routes: [
        {
          path: 'campaigns/sponsored/details',
          component: MockBaseComponent,
        },
      ],
      providers: [provideMockStore(), provideTestingSvgImage()],
    });
  }

  beforeEach(async () => await setupTest());

  it('should create campaign types', async () => {
    expect(screen.getAllByTestId('card-body')).toHaveLength(3);
  });

  it('should navigate when select a campaign type', inject([Location], async (location: Location) => {
    fireEvent.click(screen.getAllByTestId('card-button')[0]);
    expect(location.path()).toBe('/campaigns/sponsored/details');
  }));
});
