import {Injectable, inject} from '@angular/core';
import {SVG_IMAGE_OPTIONS} from './svg-image.provider';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable, catchError, iif, map, of, shareReplay, switchMap, take} from 'rxjs';
import {SvgImage, SvgImageConfig} from './svg-image.config';
import {GLOBAL_WINDOW_PROVIDER_TOKEN} from '@core/global.tokens';

@Injectable()
export class SvgImageService {
  private readonly options = inject(SVG_IMAGE_OPTIONS);
  private readonly globalWindow = inject(GLOBAL_WINDOW_PROVIDER_TOKEN);
  private readonly httpClient = inject(HttpClient);
  private baseUrl: string = '';
  private metadata$: Observable<SvgImage[]>;

  constructor() {
    this.baseUrl = this.globalWindow.location.origin;
    this.metadata$ = this.httpClient
      .get<SvgImageConfig>(`${this.baseUrl + this.options.path}`, {responseType: 'json'})
      .pipe(
        map((config: SvgImageConfig) => config.iconImageFiles),
        shareReplay(),
      );
  }

  /**
   * Downloads the given svg file and returns its content.
   *
   * @param imageName svg name in config
   */
  public loadSvg(imageName: string) {
    return this.metadata$.pipe(
      map((images) => images.find((img) => img.imageName === imageName)),
      switchMap((image) =>
        iif(
          () => !!image,
          this.httpClient.get(`${this.baseUrl + image?.imagePath}`, {responseType: 'arraybuffer'}),
          EMPTY,
        ).pipe(map((buffer) => String.fromCharCode(...new Uint8Array(buffer)))),
      ),
      catchError(() => of(undefined)),
      take(1),
    );
  }
}
