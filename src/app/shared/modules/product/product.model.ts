export class Product {
  id: number = 0;
  sku: string = '';
  price: string = '';
  title: string = '';
  stock: number = 0;
  category: string = '';
  image: string = '';

  get stockStat() {
    return this.stock > 0 ? 'In Stock' : 'No stock';
  }
}
