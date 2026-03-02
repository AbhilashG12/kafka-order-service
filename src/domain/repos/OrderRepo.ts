import { type Order } from "../entities/Order.js";

export interface OrderRepository {
  save(order: Order): Promise<void>;
}