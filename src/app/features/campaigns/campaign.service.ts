import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_CONFIG} from 'src/app/app.config';
import {Campaign} from './campaigns.model';

@Injectable()
export class CampaignService {
  private readonly appConfig = inject(APP_CONFIG);
  private readonly httpClient = inject(HttpClient);
  private readonly BASE_URL = `${this.appConfig.databaseUrl}campaigns.json`;

  /**
   * Persist a new campaign
   *
   * @param campaign new campaign
   */
  public saveCampaign(campaign: Campaign) {
    return this.httpClient.post(this.BASE_URL, campaign);
  }

  /**
   * Loads all campaigns for specific account.
   *
   * @returns campaigns array
   */
  public getCampaigns(): Observable<Campaign[]> {
    // TODO Optimize to load of campaigns for specific query options (limit, order, filter etc.)
    return this.httpClient.get<Campaign[]>(this.BASE_URL);
  }
}
