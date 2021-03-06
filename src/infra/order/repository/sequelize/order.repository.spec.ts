import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

describe("Order Repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const cutomerRepository = new CustomerRepository();
    const customer = new Customer("1", "Elton");
    const address = new Address("Rua", 1, "12345-678", "Cidade");
    customer.addAddress(address);
    await cutomerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("5", "macbook air m1", 7000);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "1",
      customer_id: "1",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: product.id,
          order_id: order.id,
          quantity: orderItem.quantity,
        },
      ],
    });
  });

  it("should findById an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Elton");
    const address = new Address("Rua", 1, "12345-678", "Cidade");
    customer.addAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("5", "macbook air m1", 7000);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 3);

    const order = new Order("1", customer.id, [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.findById(order.id);
    expect(foundOrder).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const cutomerRepository = new CustomerRepository();
    const customer = new Customer("1", "Elton");
    const address = new Address("Rua", 1, "12345-678", "Cidade");
    customer.addAddress(address);
    await cutomerRepository.create(customer);

    const productRepository = new ProductRepository();
    const macbook = new Product("5", "macbook air m1", 7000);
    await productRepository.create(macbook);
    const monitor = new Product("7", "monitor", 1000);
    await productRepository.create(monitor);

    const macbookItem = new OrderItem("1", macbook.name, macbook.price, macbook.id, 1);

    const monitorItem = new OrderItem("2", monitor.name, monitor.price, monitor.id, 1);

    const order = new Order("1", customer.id, [macbookItem, monitorItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrders = await orderRepository.findAll();
    expect(foundOrders).toStrictEqual([order]);
  });

  it("should delete order", async () => {
    const cutomerRepository = new CustomerRepository();
    const customer = new Customer("1", "Elton");
    const address = new Address("Rua", 1, "12345-678", "Cidade");
    customer.addAddress(address);
    await cutomerRepository.create(customer);

    const productRepository = new ProductRepository();
    const macbook = new Product("5", "macbook air m1", 7000);
    await productRepository.create(macbook);

    const macbookItem = new OrderItem("1", macbook.name, macbook.price, macbook.id, 1);

    const order = new Order("1", customer.id, [macbookItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.findById(order.id);
    expect(foundOrder).toStrictEqual(order);

    await orderRepository.delete(order);
    expect(await orderRepository.findById(order.id)).toBeUndefined();
  });

  it("should update order", async () => {
    const cutomerRepository = new CustomerRepository();
    const customer = new Customer("1", "Elton");
    const address = new Address("Rua", 1, "12345-678", "Cidade");
    customer.addAddress(address);
    await cutomerRepository.create(customer);

    const productRepository = new ProductRepository();
    let macbook = new Product("5", "macbook air m1", 7000);
    await productRepository.create(macbook);

    let macbookItem = new OrderItem("1", macbook.name, macbook.price, macbook.id, 1);

    const order = new Order("1", customer.id, [macbookItem]);
    let orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let foundOrder = await orderRepository.findById(order.id);
    expect(foundOrder).toStrictEqual(order);

    macbook.changePrice(6500);
    macbook.changeName("Macbook Air usado");
    macbookItem = new OrderItem("1", macbook.name, macbook.price, macbook.id, 1);

    const newOrder = new Order("1", customer.id, [macbookItem]);
    await orderRepository.update(newOrder);

    foundOrder = await orderRepository.findById(newOrder.id);
    expect(foundOrder).toStrictEqual(newOrder);
  });
});
