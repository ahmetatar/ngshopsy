import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SvgDirective} from '@shared/directives';
import {Product} from './product.model';

@Component({
  selector: 'ngs-product-pres',
  standalone: true,
  imports: [CommonModule, SvgDirective],
  templateUrl: './product-pres.component.html',
  styleUrls: ['./product-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPresComponent {
  @Input()
  product!: Product;
}
