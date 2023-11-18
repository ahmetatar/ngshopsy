import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavigationModel} from '../contracts';
import {Observable, filter} from 'rxjs';
import {NavigationPresComponent} from '../presenter';
import {AuthActions, AuthState, selectUser} from '@core/auth';
import {Store, select} from '@ngrx/store';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'ngs-navigation-cont',
  standalone: true,
  imports: [AsyncPipe, NavigationPresComponent],
  template: `<ngs-navigation-pres title="NgShopsy - PPC Campaign Management Tool" [navigationModel]="navigationModel$ | async" (logout)="logout()" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContComponent {
  private readonly store: Store<AuthState> = inject(Store);

  /**
   * Navigation model for presenter
   */
  navigationModel$!: Observable<NavigationModel>;

  constructor() {
    this.navigationModel$ = this.store.pipe(
      select(selectUser),
      filter((user) => !!user),
      takeUntilDestroyed()
    );
  }

  /**
   * Changes authentication state and redirect user to login page
   */
  logout() {
    this.store.dispatch(AuthActions.signOut());
  }
}
