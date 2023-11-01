import {ChangeDetectionStrategy, Component, ViewEncapsulation, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {NavigationModel} from '../contracts/navigation.contract';
import {Observable, combineLatest, map} from 'rxjs';
import {NavigationPresComponent} from '../presenter';
import {AuthService} from '@core/auth/auth.service';

@Component({
  selector: 'ngs-navigation-cont',
  standalone: true,
  imports: [CommonModule, NavigationPresComponent],
  providers: [AuthService],
  template: `<ngs-navigation-pres [navigationModel]="navigationModel$ | async" (logout)="logout()" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationContComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  /**
   * Navigation model for presenter
   */
  navigationModel$!: Observable<NavigationModel>;

  ngOnInit() {
    this.navigationModel$ = combineLatest([
      this.authService.isAuthenticated$, 
      this.authService.user$]
    ).pipe(map(([isAuthenticated, user]) => ({
        email: user.email,
        isAuthenticated,
      })),
    );
  }

  /**
   * Changes authentication state and redirect user to login page
   */
  logout() {
    this.authService.signout();
    this.router.navigate(['login']);
  }
}
