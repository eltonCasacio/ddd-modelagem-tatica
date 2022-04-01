import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "./db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      cep: entity.address.cep,
      city: entity.address.city,
      active: entity.active,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        cep: entity.address.cep,
        city: entity.address.city,
        active: entity.active,
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async delete(entity: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<Customer[]> {
    const foundCustomers = await CustomerModel.findAll();
    return foundCustomers.map((foundCustomer) => {
      const customer = new Customer(foundCustomer.id, foundCustomer.name);
      const address = new Address(
        foundCustomer.street,
        foundCustomer.number,
        foundCustomer.cep,
        foundCustomer.city
      );

      customer.addAddress(address);

      return customer;
    });
  }

  async findById(id: number): Promise<Customer> {
    const foundCustomer = await CustomerModel.findOne({ where: { id } });
    const customer = new Customer(foundCustomer.id, foundCustomer.name);
    const address = new Address(
      foundCustomer.street,
      foundCustomer.number,
      foundCustomer.cep,
      foundCustomer.city
    );

    customer.addAddress(address);

    return customer;
  }
}
