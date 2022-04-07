import OrderItem from "../entity/order_item";
import OrderFactory, { OrderFactoryProps } from "./order.factory";
import { v4 as uuid } from "uuid";

describe("OrderFactory unit test", () => {
  it("should create an instance of Order", () => {
    const orderItem = new OrderItem(uuid(), "any_product", 1, "1", 1);
    const params = {} as OrderFactoryProps;
    params.id = uuid();
    params.customerId = uuid();
    params.items = [orderItem];

    const order = OrderFactory.create(params);

    expect(order).toBeDefined();
    expect(order.id).toBe(params.id);
    expect(order.customerId).toBe(params.customerId);
    expect(order.items).toBeDefined();
    expect(order.items.length).toBe(1);
    expect(order.items[0].price).toBe(orderItem.price);
  });
});
