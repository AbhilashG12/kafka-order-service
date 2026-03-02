import { type Order } from "../domain/entities/Order.js";
import { type OrderEventRepo } from "../domain/repos/OrderEventRepo.js";
import type { OrderRepository } from "../domain/repos/OrderRepo.js";

export class CreateOrderUseCase{ 
    constructor(private orderRepo:OrderRepository,private eventRepo : OrderEventRepo){}

    async execute(order:Order){
         await this.orderRepo.save(order);
        await this.eventRepo.publishOrderCreated({
            orderId : order.id,
            userId : order.userId,
            amount : order.amount,
        })

        return {status:"ORDER_EVENT_PUBLISHED",order}
    }
}