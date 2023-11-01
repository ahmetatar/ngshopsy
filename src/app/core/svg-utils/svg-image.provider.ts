import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from '@angular/core';
import {SvgImageOptions} from './svg-image.config';
import {SvgImageService} from './svg-image.service';

export const SVG_IMAGE_OPTIONS = new InjectionToken<SvgImageOptions>('Svg image options');

/**
 * Providers factory for standalone API
 *
 * @param options svg image options
 * @returns providers
 */
export function provideSvgImage(options: SvgImageOptions): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: SVG_IMAGE_OPTIONS,
      useValue: options,
    },
    SvgImageService,
  ]);
}
