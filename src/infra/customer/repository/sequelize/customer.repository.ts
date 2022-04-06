import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

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
    const customersModel = await CustomerModel.findAll();
    return customersModel.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.cep,
        customerModel.city
      );
      customer.addRewardPoints(customerModel.rewardPoints);
      customer.addAddress(address);
      return customer;
    });
  }

  async findById(id: string): Promise<Customer> {
    let foundCustomer;
    try {
      foundCustomer = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(foundCustomer.id, foundCustomer.name);
    const address = new Address(
      foundCustomer.street,
      foundCustomer.number,
      foundCustomer.cep,
      foundCustomer.city
    );

    customer.addAddress(address);
    customer.addRewardPoints(foundCustomer.rewardPoints);

    return customer;
  }
}
