import { Customer } from "./customer";
import { Address } from "./address";

describe("Customer", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Elton");
    }).toThrowError("Id is required!");
  });

  it("Should throw error if name is empty", () => {
    expect(() => {
      new Customer("1", "");
    }).toThrowError("Name is required!");
  });

  it("Should when change name", () => {
    const customer = new Customer("1", "Helton");
    customer.changeName("Elton");
    expect(customer.name).toBe("Elton");
  });

  it("should activete custumer", () => {
    const customer = new Customer("1", "Helton");
    const address = new Address("1", 1, "São Paulo", "SP");
    customer.addAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when try activate customer and address is undefine", () => {
    const customer = new Customer("1", "Helton");
    expect(() => {
      customer.activate();
    }).toThrowError("Address is required!");
  });

  it("should deactivate customer", () => {});
  const customer = new Customer("1", "Helton");
  customer.diactivate();
  expect(customer.isActive()).toBe(false);
});
