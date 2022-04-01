import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import CustomerModel from "./db/sequelize/model/customer.model";

describe("Customer repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create Customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345678", "City 1");
    customer.addAddress(address);

    customerRepository.create(customer);

    const foundCustomer = await customerRepository.findById(1);

    expect(foundCustomer).toEqual(customer);
  });

  it("should update customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345678", "City 1");
    customer.addAddress(address);
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.findById(1);

    expect(foundCustomer).toEqual(customer);

    foundCustomer.changeName("Elton");
    await customerRepository.update(foundCustomer);
    const updatedCustomer = await customerRepository.findById(1);

    expect(updatedCustomer.name).toEqual("Elton");
  });

  it("should finfAll customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "12345678", "City 1");
    customer1.addAddress(address1);
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "87654321", "City 2");
    customer2.addAddress(address2);
    await customerRepository.create(customer2);

    const foundCustomers = await customerRepository.findAll();

    expect(foundCustomers).toEqual([customer1, customer2]);
  })
});
