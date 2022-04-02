import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerRepository from "./customer.repository";
import CustomerModel from "./db/sequelize/model/customer.model";
import OrderItemModel from "./db/sequelize/model/order-item.model";
import OrderModel from "./db/sequelize/model/order.model";
import ProductModel from "./db/sequelize/model/product.model";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order Repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    // const cutomerRepository = new CustomerRepository();
    // const customer = new Customer("1", "Elton");
    // const address = new Address("Rua", 1, "12345-678", "Cidade");
    // customer.addAddress(address);
    // await cutomerRepository.create(customer);

    // const productRepository = new ProductRepository();
    // const product = new Product("5", "macbook air m1", 7000);
    // await productRepository.create(product);
    
    // const orderItem = new OrderItem("1", "ordemItem 1", 7000, product.id, 1);

    // const order = new Order("1", customer.id, [orderItem]);
    // const orderRepository = new OrderRepository();
    // await orderRepository.create(order);

  })
});
