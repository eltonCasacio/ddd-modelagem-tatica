import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

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
    await OrderItemModel.update(
      {
        name: entity.items[0].name,
        price: entity.items[0].price,
        product_id: entity.items[0].productId,
        quantity: entity.items[0].quantity,
      },
      {
        where: {
          id: entity.items[0].id,
        },
      }
    );
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
            new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
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

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      )
    );
  }
}
