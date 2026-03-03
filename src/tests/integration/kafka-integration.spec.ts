import { KafkaContainer } from "@testcontainers/kafka";
import { Kafka } from "kafkajs";
import { describe, it, expect, jest } from '@jest/globals';

describe("Kafka with TestContainers", () => {
  jest.setTimeout(120000); 

  it("should publish and consume messages", async () => {
    const container = await new KafkaContainer("confluentinc/cp-kafka:7.5.0").start();
    
    const broker = (container as any).getBootstrapServers 
      ? (container as any).getBootstrapServers() 
      : `${container.getHost()}:${container.getMappedPort(9092)}`;

    const kafka = new Kafka({ brokers: [broker] });
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: "tc-group" });

    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: "orders", fromBeginning: true });

    const event = { orderId: "111", userId: "99", amount: 200 };
    
    const consumedPromise = new Promise((resolve) => {
      consumer.run({
        eachMessage: async ({ message }) => {
          if (message.value) resolve(JSON.parse(message.value.toString()));
        },
      });
    });

    await producer.send({
      topic: "orders",
      messages: [{ value: JSON.stringify(event) }],
    });

    const result = await consumedPromise;
    expect(result).toEqual(event);


    await producer.disconnect();
    await consumer.disconnect();
    await container.stop();
  });
});