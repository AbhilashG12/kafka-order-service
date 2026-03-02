import { type Order } from "../../domain/entities/Order.js";

export class FakeOrderDB {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {

    await new Promise((r) => setTimeout(r, 200));
    this.orders.push(order);
    console.log("💾 Order saved to FakeDB:", order);
  }

  async getById(id: string): Promise<Order | null> {
    await new Promise((r) => setTimeout(r, 100));
    return this.orders.find((o) => o.id === id) || null;
  }
}