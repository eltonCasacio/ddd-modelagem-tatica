import OrderItem from "./order_item";
export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  validate(): void {
    if (!this._id) throw new Error("Id is required!");
    if (!this._customerId) throw new Error("Customer_ID is required!");
    if (this._items.length === 0) throw new Error("Items is required!");
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error("Quantity must be greater than zero");
    }
  }

  toString() {
    return `ID: ${this._id}\nCustomer_ID: ${this._customerId}\nITEMS: ${this._items}`;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
