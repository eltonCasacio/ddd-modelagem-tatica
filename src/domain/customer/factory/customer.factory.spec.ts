import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.createWithoutAddress("John Doe");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const customer = CustomerFactory.createWithAddress(
      "John Doe",
      new Address("Street 1", 224, "any_cep", "any_city")
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("John Doe");
    expect(customer.address).toBeDefined();
  });
});
