import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("1", "Elton Casacio");
const address = new Address("Rua 6", 224, "13222222", "Valinhos");
customer.addAddress(address);
customer.activate();

const macbook = new OrderItem("1", "MacBook Air M1", 7500, "", 2);
const iphone = new OrderItem("2", "iPhone", 6500, "", 1);

const order = new Order("1", customer.id, [macbook, iphone]);

console.debug(`Ordem de Compra: ${order.toString()}`);
