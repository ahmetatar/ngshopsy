import {Meta, StoryObj, moduleMetadata} from '@storybook/angular';
import {NavigationPresComponent} from './navigation-pres.component';
import {RouterTestingModule} from '@angular/router/testing';

export default {
  title: 'Features/Navigation',
  component: NavigationPresComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  args: {
    title: 'NgShopsy',
  },
} as Meta<NavigationPresComponent>;

/** Default component story type */
type Story = StoryObj<NavigationPresComponent>;

/** Default story */
export const Primary: Story = {
  render: (args: NavigationPresComponent) => ({
    props: {
      ...args,
    },
  }),
};

/** Authenticated story */
export const Authenticated: Story = {
  render: (args: NavigationPresComponent) => ({
    props: {
      ...Primary.args,
      ...args,
    },
  }),
  args: {
    navigationModel: {
      isAuthenticated: true,
      email: 'ahmet.atar@amadeus.com',
    },
  },
};
