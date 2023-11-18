import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {APP_CONFIG} from 'src/app/app.config';
import {Product} from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly appConfig = inject(APP_CONFIG);
  private readonly httpClient = inject(HttpClient);
  private readonly BASE_URL = `${this.appConfig.databaseUrl}products.json`;

  /**
   * Loads products owned by the user
   */
  public loadProducts() {
    return this.httpClient.get<Product[]>(this.BASE_URL);
  }
}
