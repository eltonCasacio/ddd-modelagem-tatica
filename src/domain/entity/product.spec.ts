import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product(0, "", 1);
    }).toThrowError("Id is required!");
  });

  it("should throw erro when name is empty", () => {
    expect(() => {
      new Product(1, "", 234);
    }).toThrowError("Name is required!");
  });

  it("should throw erro when price less than zero", () => {
    expect(() => {
      new Product(1, "Elton", -1);
    }).toThrowError("Price must be greater than zero!");
  });

  it("should change name", () => {
    const product = new Product(1, "Elton", 543);
    product.changeName("Elton Junior");
    expect(product.name).toBe("Elton Junior");
  });

  it("should throw error when change name with empty value", () => {
    const product = new Product(1, "Elton", 100);
    expect(() => {
      product.changeName("");
    }).toThrowError("Name can't be empty!");
  });

  it("should change price", () => {
    const product = new Product(1, "Elton", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });

  it("should throw error when change price with less than zero value", () => {
    const product = new Product(1, "Elton", 100);
    expect(() => {
      product.changePrice(-1);
    }).toThrowError("Price must be greater than zero!");
  });
});
