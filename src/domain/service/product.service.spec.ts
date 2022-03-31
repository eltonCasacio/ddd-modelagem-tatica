import { Customer } from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { Product } from "../entity/product";
import { ProductService } from "./product.service";

describe("Product Service unit test", () => {
  it("should change prices of all products", () => {
    const product1 = new Product(1, "product 1", 10);
    const product2 = new Product(2, "product 2", 130);
    const products = [product1, product2];

    ProductService.increasePriceInPercent(products, 10);

    expect(product1.price).toBe(11);
    expect(product2.price).toBe(143);

    const product3 = new Product(2, "product 2", 130);
    products.push(product3);

    ProductService.increasePriceInPercent(products, 100);

    expect(product1.price).toBe(22);
    expect(product2.price).toBe(286);
    expect(product3.price).toBe(260);
  });
});
