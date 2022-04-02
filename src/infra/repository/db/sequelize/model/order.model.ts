import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_Id: string;

  //Recuperar os dados do customer
  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @Column({ allowNull: false })
  declare total: number;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}
