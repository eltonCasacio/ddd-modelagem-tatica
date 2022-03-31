import OrderItem from "./order_item";

describe("Order Item unit test", () => {
  it("should throw error productId is empty", () => {
    expect(() => {
      new OrderItem("", "1", 54, "", 0);
    }).toThrowError("Product_ID is required!");
  });

  it("should throw error when quantity less than 1", () => {
    expect(() => {
      new OrderItem("1", "1", 54, "p1", -1);
    }).toThrowError("Quantity must be greater than zero");
  });
});
