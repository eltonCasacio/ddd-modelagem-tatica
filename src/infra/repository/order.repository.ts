import order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";

export default class OrderRepository implements OrderRepositoryInterface {
  create(entity: order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(entity: order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(entity: order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<order[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: number): Promise<order> {
    throw new Error("Method not implemented.");
  }
}
