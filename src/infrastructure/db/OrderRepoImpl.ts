import { type OrderRepository } from "../../domain/repos/OrderRepo.js";
import { FakeOrderDB } from "./FakeDb.js";
import { type Order } from "../../domain/entities/Order.js";

export class OrderRepoImpl implements OrderRepository {
  constructor(private db: FakeOrderDB) {}

  async save(order: Order): Promise<void> {
    await this.db.save(order);
  }
}