import {InjectionToken} from '@angular/core';

/**
 * Application configuration schema
 */
export interface AppConfig {
  authBaseUrl: string;
  firebaseApiKey: string;
  databaseUrl: string;
}

/**
 * Default application configuration
 */
export const defaultAppConfig: AppConfig = {
  firebaseApiKey: 'AIzaSyBovnAiRVSFXkT15t5L8QYlehkWnDOGBSk',
  authBaseUrl: 'https://identitytoolkit.googleapis.com/v1/accounts',
  databaseUrl: 'https://ng-firebase-samples-default-rtdb.firebaseio.com/',
};

export const APP_CONFIG = new InjectionToken<AppConfig>('App config token', {
  factory: () => defaultAppConfig,
  providedIn: 'root',
});
