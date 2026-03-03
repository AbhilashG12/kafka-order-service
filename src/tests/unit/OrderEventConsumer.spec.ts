import { jest, describe, it, expect } from '@jest/globals';

jest.unstable_mockModule("../infrastructure/kafka/KafkaClient.js", () => ({
  kafka: {
    consumer: jest.fn<any>().mockReturnValue({
      connect: jest.fn<any>().mockResolvedValue(undefined),
      subscribe: jest.fn<any>().mockResolvedValue(undefined),
      run: jest.fn<any>().mockResolvedValue(undefined),
    })
  }
}));

const { startOrderConsumer } = await import("../../infrastructure/kafka/OrderEventConsumer.js");

describe("OrderEventConsumer", () => {
  it("should start the consumer correctly", async () => {

    await expect(startOrderConsumer()).resolves.not.toThrow();
  });
});