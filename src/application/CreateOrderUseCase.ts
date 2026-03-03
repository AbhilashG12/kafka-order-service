import { type Order } from "../domain/entities/Order.js";
import { type OrderEventRepo } from "../domain/repos/OrderEventRepo.js";
import type { OrderRepository } from "../domain/repos/OrderRepo.js";

export class CreateOrderUseCase {
  constructor(
    private orderRepo: OrderRepository,
    private eventRepo: OrderEventRepo
  ) {}

  async execute(orderData: Order) {
    const order: Order = {
      ...orderData,
      id: orderData.id || Math.random().toString(36).substring(7),
    };
    await this.orderRepo.save(order);
    await this.eventRepo.publishOrderCreated({
      orderId: order.id,
      userId: order.userId,
      amount: order.amount,
    });

    return { 
      status: "ORDER_CREATED_AND_EVENT_PUBLISHED", 
      order 
    };
  }
}