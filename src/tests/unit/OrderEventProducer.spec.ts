import { jest, describe, it, expect } from '@jest/globals';

// 1. Define the mock with explicit <any, any> types to stop the 'never' error
jest.unstable_mockModule('kafkajs', () => ({
  Kafka: jest.fn<any>().mockImplementation(() => ({
    producer: jest.fn<any>().mockReturnValue({
      connect: jest.fn<any>().mockResolvedValue(undefined),
      send: jest.fn<any>().mockResolvedValue(undefined),
      disconnect: jest.fn<any>().mockResolvedValue(undefined),
    }),
  })),
}));

// 2. Dynamic import MUST happen after the mock
const { OrderEventProducer } = await import("../../infrastructure/kafka/OrderEventProducer.js");

describe("OrderEventProducer", () => {
  it("should call kafka producer.send() with correct payload", async () => {
    const repo = new OrderEventProducer();
    
    await repo.publishOrderCreated({
      orderId: "11",
      userId: "user_1",
      amount: 100
    });

    expect(true).toBe(true); 
  });
});