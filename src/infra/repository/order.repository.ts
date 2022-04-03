import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "./db/sequelize/model/order-item.model";
import OrderModel from "./db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          order_id: entity.id,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(entity: Order): Promise<void> {
    await OrderModel.destroy({ where: { id: entity.id } });
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: ["items"] });

    return ordersModel.map((orderModel) => {
      const order = new Order(
        orderModel.id,
        orderModel.customer_id,
        orderModel.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.product_id,
              item.quantity
            )
        )
      );
      return order;
    });
  }

  async findById(id: string): Promise<Order> {
    let orderModel: OrderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: { id },
        include: ["items"],
      });
    } catch (error) {
      throw new Error(`Order with id ${id} not found`);
    }

    if (!orderModel) return undefined;

    const order = new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity
          )
      )
    );
    return order;
  }
}
