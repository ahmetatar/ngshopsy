import {setCompodocJson} from '@storybook/addon-docs/angular';
import {componentWrapperDecorator} from '@storybook/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);

const bootstrapBreakpoints = {
  XS: {name: 'X Small', styles: {width: '390px', height: ''}},
  SM: {name: 'Small', styles: {width: '577px', height: ''}},
  MD: {name: 'Medium', styles: {width: '769px', height: ''}},
  LG: {name: 'Large', styles: {width: '993px', height: ''}},
  XL: {name: 'Extra large', styles: {width: '1210px', height: ''}},
  XXL: {name: 'Extra extra large', styles: {width: '1410px', height: ''}},
};

const preview = {
  parameters: {
    viewport: {
      viewports: bootstrapBreakpoints,
    },
  },
  decorators: [componentWrapperDecorator((story) => `<div class="theme-orange">${story}</div>`)],
};

export default preview;
