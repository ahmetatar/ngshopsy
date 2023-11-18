import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Product, ProductPresComponent} from '@shared/modules/product';
import {AdGroup} from '@features/campaigns';

@Component({
  selector: 'ngs-campaign-ad-group-pres',
  standalone: true,
  imports: [CommonModule, ProductPresComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './campaign-ad-group-pres.component.html',
  styleUrls: ['./campaign-ad-group-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignAdGroupPresComponent {
  /** Keeps products added to the ad group */
  productsAddedtoAdGroup: Product[] = [];

  /** Ad group name form control */
  adGroupNameControl: FormControl = new FormControl('', {validators: [Validators.required]});

  /** Products that can be added to this ad group */
  @Input()
  availableProducts: Product[] = [];

  @Output()
  adGroupUpdated = new EventEmitter<AdGroup>();

  onProductGroupChange(type: 'add' | 'remove', product: Product) {
    if (type === 'add') {
      this.availableProducts = this.availableProducts.filter((p) => p.id !== product.id);
      this.productsAddedtoAdGroup = [...this.productsAddedtoAdGroup, product];
    } else {
      this.productsAddedtoAdGroup = this.productsAddedtoAdGroup.filter((p) => p.id !== product.id);
      this.availableProducts = [...this.availableProducts, product];
    }
  }

  onSubmit() {
    this.adGroupUpdated.emit({
      name: this.adGroupNameControl.value,
      products: this.productsAddedtoAdGroup.map((product) => product.id),
      keywords: [],
    });
  }
}
