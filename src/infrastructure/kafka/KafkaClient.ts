import { Kafka } from "kafkajs";

export const kafka = new Kafka({
    clientId : "order-system",
    brokers : ["localhost:9092"]
})