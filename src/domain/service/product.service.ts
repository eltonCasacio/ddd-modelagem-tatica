import { Product } from "../entity/product";

export class ProductService {
  static increasePriceInPercent(products: Product[], percentege: number) {
    products.forEach((product) => product.changePrice(product.price * (percentege / 100) + product.price));
  }
}
