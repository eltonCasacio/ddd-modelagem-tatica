import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit test", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "John");
    const item = new OrderItem("1", "any_name", 10, "product_id", 2);

    const order = OrderService.placeOrder(customer, [item]);
    expect(customer.rewardPoints).toBe(10);
    expect(order.total()).toBe(20);
  });

  it("should add reward points", () => {
    const customer = new Customer("c1", "John");
    expect(customer.rewardPoints).toBe(0);

    const item = new OrderItem("1", "any_name", 10, "product_id", 2);
    const order = OrderService.placeOrder(customer, [item]);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20);

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(30);
  });

  it("should get total price of all orders", () => {
    const item1 = new OrderItem("1", "item1", 10, "1", 10);
    const item2 = new OrderItem("2", "item2", 23, "1", 1);

    const order1 = new Order("1", "1", [item1]);
    const order2 = new Order("2", "1", [item2]);
    const orders = [order1, order2];

    let total = OrderService.sumTotalPrice(orders);
    expect(total).toBe(123);

    const item3 = new OrderItem("2", "item2", 200, "1", 2);
    const order3 = new Order("2", "1", [item3]);
    orders.push(order3);

    total = OrderService.sumTotalPrice(orders);
    expect(total).toBe(523);
  });
});
