import { type OrderEventRepo } from "../../domain/repos/OrderEventRepo.js";
import {kafka} from "./KafkaClient.js"

export class OrderEventProducer implements OrderEventRepo{
    private producer = kafka.producer();

    async publishOrderCreated(event:any) {
    await this.producer.connect();
    await this.producer.send({
      topic: "order-created",
      messages: [{ value: JSON.stringify(event) }],
    });
    console.log("Event published to Kafka:", event);
  }
}