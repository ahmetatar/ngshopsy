import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed, fakeAsync, flushMicrotasks, inject} from '@angular/core/testing';
import {provideSvgImage} from './svg-image.provider';
import {SvgImageService} from './svg-image.service';
import {HttpClientModule} from '@angular/common/http';
import {GLOBAL_WINDOW_PROVIDER_TOKEN} from '@core/global.tokens';
import {SvgImage} from './svg-image.config';
import {of} from 'rxjs';

describe('SvgImageService tests', () => {
  const expectedUrl = 'https://baseurl/some/path';
  const mockConfig = {
    iconImageFiles: [
      {
        imageName: 'login',
        imagePath: '/images/login.svg',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        provideHttpClientTesting(),
        provideSvgImage({
          path: '/some/path',
        }),
        {
          provide: GLOBAL_WINDOW_PROVIDER_TOKEN,
          useValue: {
            location: {origin: 'https://baseurl'},
          },
        },
      ],
    });
  });

  afterAll(() => jest.clearAllMocks());

  it('should prepare metadata by downloading config file', fakeAsync(
    inject([SvgImageService, HttpTestingController], (svgService: SvgImageService, backend: HttpTestingController) => {
      (svgService as any).metadata$.subscribe((imageFiles: SvgImage[]) => {
        expect(imageFiles).toBeTruthy();
        expect(imageFiles.length).toBe(1);
      });

      backend
        .expectOne((req) => req.url === expectedUrl && req.responseType === 'json' && req.method === 'GET')
        .flush(mockConfig);
      flushMicrotasks();
    }),
  ));

  it('should only be requested once metadata file', inject(
    [SvgImageService, HttpTestingController],
    (svgService: SvgImageService, backend: HttpTestingController) => {
      (svgService as any).metadata$.subscribe();
      (svgService as any).metadata$.subscribe();

      backend.expectOne(expectedUrl).flush(mockConfig);
    },
  ));

  it('should load svg file if given image name is found', fakeAsync(
    inject([SvgImageService, HttpTestingController], (svgService: SvgImageService, backend: HttpTestingController) => {
      const expectedFileNameUrl = 'https://baseurl/images/login.svg';
      const buffer = new ArrayBuffer(4);
      const view = new Uint8Array(buffer);
      view.set([84, 101, 115, 116], 0);
      (svgService as any).metadata$ = of(mockConfig.iconImageFiles);

      svgService.loadSvg('login').subscribe((content) => {
        expect(content).toBe('Test');
      });

      backend.expectOne(expectedFileNameUrl).flush(view.buffer);
      flushMicrotasks();
    }),
  ));

  it('should return undefined if image file not found', fakeAsync(
    inject([SvgImageService, HttpTestingController], (svgService: SvgImageService, backend: HttpTestingController) => {
      const expectedFileNameUrl = 'https://baseurl/images/login.svg';
      (svgService as any).metadata$ = of(mockConfig.iconImageFiles);

      svgService.loadSvg('login').subscribe((content) => {
        expect(content).toBeUndefined();
      });

      backend.expectOne(expectedFileNameUrl).flush(null, {status: 404, statusText: 'Not Found'});
    }),
  ));

  it('should return undefined if image file name not found in metadata', inject(
    [SvgImageService, HttpTestingController],
    (svgService: SvgImageService, backend: HttpTestingController) => {
      const expectedFileNameUrl = 'https://baseurl/images/logout.svg';
      (svgService as any).metadata$ = of(mockConfig.iconImageFiles);

      svgService.loadSvg('logout').subscribe({
        complete: () => expect.anything(),
      });

      backend.expectNone(expectedFileNameUrl);
    },
  ));
});
