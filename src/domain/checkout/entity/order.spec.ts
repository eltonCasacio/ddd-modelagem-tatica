import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "1", []);
    }).toThrowError("Id is required!");
  });

  it("should throw error when customerID is empty", () => {
    expect(() => {
      new Order("1", "", []);
    }).toThrowError("Customer_ID is required!");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order("1", "1", []);
    }).toThrowError("Items is required!");
  });

  it("should calculate total", () => {
    const items = [new OrderItem("1", "1", 100, "p1", 2)];
    const item = new OrderItem("item 5", "5", 200, "p1", 1);
    items.push(item);
    const order = new Order("1", "1", items);
    expect(order.total()).toBe(400);
  });

  it("should throw error if the item quantity are equal or less than zero", () => {
    expect(() => {
      const item = new OrderItem("item 5", "5", 200, "p1", -1);
      const order = new Order("order1", "customer 1", [item]);
    }).toThrowError("Quantity must be greater than zero");
  });
});
