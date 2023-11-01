import {Meta, StoryObj} from '@storybook/angular';
import {NavigationPresComponent} from './navigation-pres.component';
import {action} from '@storybook/addon-actions';

export default {
  title: 'Features/Navigation',
  component: NavigationPresComponent,
  args: {
    title: 'NgShopsy',
  },
} as Meta<NavigationPresComponent>;

/** Default component story type */
type Story = StoryObj<NavigationPresComponent>;

/** Story actions */
const actions = {
  onLogout: action('logout'),
  onLogin: action('login'),
};

/** Component events binded to actions */
const events = {
  login: actions.onLogin,
  logout: actions.onLogout,
};

/** Default story */
export const Primary: Story = {
  render: (args: NavigationPresComponent) => ({
    props: {
      ...args,
      ...events,
    },
  }),
};

/** Authenticated story */
export const Authenticated: Story = {
  render: (args: NavigationPresComponent) => ({
    props: {
      ...Primary.args,
      ...args,
      ...events,
    },
  }),
  args: {
    navigationModel: {
      isAuthenticated: true,
      email: 'ahmet.atar@amadeus.com',
    },
  },
};
