import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationPresComponent} from './navigation-pres.component';
import {NavigationPresComponentFixture} from './navigation-pres.component.fixture';
import {NavigationModel} from '../contracts/navigation.contract';
import {
  isVisibleLoginAndSignupButtonsForAnonymousUsers,
  isVisibleOnlyLogoutButtonIfUserIsAuthenticated,
} from './navigation-pres.testing.helper';

describe('NavigationPresComponent', () => {
  let component: NavigationPresComponent;
  let fixture: ComponentFixture<NavigationPresComponent>;
  let navigationPresComponentFixture: NavigationPresComponentFixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationPresComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationPresComponent);
    component = fixture.componentInstance;
    navigationPresComponentFixture = new NavigationPresComponentFixture(fixture.debugElement);
  });

  it('should be visible login and signup buttons for anonymous users', async () => {
    fixture.detectChanges();
    expect(isVisibleLoginAndSignupButtonsForAnonymousUsers(navigationPresComponentFixture)).toBeTruthy();
  });

  it('should be visible only logout button if user is authenticated', async () => {
    const model: NavigationModel = {
      email: 'test-user@test.com',
      isAuthenticated: true,
    };

    component.navigationModel = model;
    fixture.detectChanges();
    expect(isVisibleOnlyLogoutButtonIfUserIsAuthenticated(navigationPresComponentFixture)).toBeTruthy();
  });
});
