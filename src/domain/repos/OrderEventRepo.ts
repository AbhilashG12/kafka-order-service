import { type OrderCreated } from "../events/OrderCreated.js";

export interface OrderEventRepo {
    publishOrderCreated(event:OrderCreated):Promise<void>;
}