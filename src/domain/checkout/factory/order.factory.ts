import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export type OrderFactoryProps = {
  id: string;
  customerId: string;
  items: OrderItem[];
};
export default class OrderFactory {
  public static create(params: OrderFactoryProps): Order {
    const items = params.items.map((item) => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
    });

    return new Order(params.id, params.customerId, items);
  }
}
