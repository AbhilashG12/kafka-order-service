import { startOrderConsumer } from "./infrastructure/kafka/OrderEventConsumer.js";

startOrderConsumer();
console.log("Consumer started")