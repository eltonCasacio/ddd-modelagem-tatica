import Product from "../entity/product";

export default class ProductService {
  static increasePriceInPercent(products: Product[], percentege: number) {
    products.forEach((product) =>
      product.changePrice(product.price * (percentege / 100) + product.price)
    );
  }
}
