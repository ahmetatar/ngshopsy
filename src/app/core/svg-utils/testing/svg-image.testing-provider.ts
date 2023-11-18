import {Provider} from '@angular/core';
import {SVG_IMAGE_OPTIONS} from '../svg-image.provider';
import {SvgImageService} from '../svg-image.service';
import {SvgImageServiceFixture} from '../svg-image.service.fixture';
import {of} from 'rxjs';

/**
 * Testing provider factory for standalone API
 *
 * @param options svg image options
 * @returns providers
 */
export function provideTestingSvgImage(): Provider[] {
  const svgImageServiceFixture = new SvgImageServiceFixture();
  svgImageServiceFixture.loadSvg.mockReturnValue(of(''));

  return [
    {
      provide: SVG_IMAGE_OPTIONS,
      useValue: {
        path: 'test/path',
      },
    },
    {
      provide: SvgImageService,
      useValue: svgImageServiceFixture,
    },
  ];
}
