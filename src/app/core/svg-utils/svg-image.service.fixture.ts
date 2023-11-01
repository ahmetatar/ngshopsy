import {SvgImageService} from './svg-image.service';

export class SvgImageServiceFixture implements Readonly<SvgImageService> {
  public loadSvg: jest.Mock;

  constructor() {
    this.loadSvg = jest.fn();
  }
}
