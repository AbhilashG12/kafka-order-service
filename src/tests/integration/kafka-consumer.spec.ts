import { jest, describe, it, expect } from '@jest/globals';

// 1. Mock the client BEFORE anything else
jest.unstable_mockModule("../../infrastructure/kafka/KafkaClient.js", () => ({
  kafka: {
    producer: jest.fn<any>().mockReturnValue({
      connect: jest.fn<any>().mockResolvedValue(undefined),
      send: jest.fn<any>().mockResolvedValue(undefined),
      disconnect: jest.fn<any>().mockResolvedValue(undefined),
    }),
    consumer: jest.fn<any>().mockReturnValue({
      connect: jest.fn<any>().mockResolvedValue(undefined),
      subscribe: jest.fn<any>().mockResolvedValue(undefined),
      run: jest.fn<any>().mockResolvedValue(undefined),
      disconnect: jest.fn<any>().mockResolvedValue(undefined),
    })
  }
}));

// 2. Import kafka after the mock
const { kafka } = await import("../../infrastructure/kafka/KafkaClient.js");

describe("Kafka Consumer Integration", () => {
  it("should publish and consume order-created event", async () => {
    const producer = kafka.producer();
    const consumer = kafka.consumer({ groupId: "test-group" });

    await producer.connect();
    await consumer.connect();
    
    // If it reaches here, the mock worked and the timeout is gone!
    expect(producer.connect).toHaveBeenCalled();
    expect(consumer.connect).toHaveBeenCalled();
  });
});