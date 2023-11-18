import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {NgIf} from '@angular/common';
import {NavigationModel} from '../contracts';
import {RouterLinkWithHref} from '@angular/router';

@Component({
  selector: 'ngs-navigation-pres',
  standalone: true,
  imports: [RouterLinkWithHref, NgIf],
  template: `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">{{ title }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-1">
          <li *ngIf="navigationModel?.isAuthenticated" class="nav-item">
            <a class="nav-link" routerLink="/campaigns">Campaigns</a>
          </li>
        </ul>
        <hr class="d-block d-sm-none" />
        <div class="navigation-actions">
          <a
            *ngIf="!navigationModel?.isAuthenticated"
            data-testid="login-button"
            class="login-button btn btn-primary me-2"
            routerLink="/login"
            >Login</a
          >
          <a
            *ngIf="!navigationModel?.isAuthenticated"
            data-testid="signup-button"
            class="signup-button btn btn-primary me-2"
            routerLink="/signup"
            >Signup</a
          >
          <button
            *ngIf="navigationModel?.isAuthenticated"
            data-testid="logout-button"
            class="logout-button btn btn-primary me-2"
            (click)="logout.emit()"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>`,
  styles: [
    `
      ngs-navigation-pres {
        .user {
          display: inline-block;
          margin-top: 0.5rem;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationPresComponent {
  /**
   * Navbar title
   */
  @Input()
  title: string = 'Navbar';

  /**
   * Navigation model
   */
  @Input()
  navigationModel!: NavigationModel | null;

  /**
   * Logout request event
   */
  @Output()
  logout: EventEmitter<void> = new EventEmitter();
}
