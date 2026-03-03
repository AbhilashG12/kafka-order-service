import { jest, describe, it, expect } from '@jest/globals';

// 1. Mock KafkaClient BEFORE anything else
jest.unstable_mockModule("../../infrastructure/kafka/KafkaClient.js", () => ({
  kafka: {
    producer: jest.fn<any>().mockReturnValue({
      connect: jest.fn<any>().mockResolvedValue(undefined),
      send: jest.fn<any>().mockResolvedValue(undefined),
      disconnect: jest.fn<any>().mockResolvedValue(undefined),
    }),
  }
}));

// 2. Mock the DB if needed, or ensure it's fake
// 3. Dynamic imports for your app
const { app } = await import("../../index.js");
import request from "supertest";

describe("POST /orders", () => {
  it("should create order and return JSON response", async () => {
    const res = await request(app)
      .post("/orders")
      .send({ userId: "1", amount: 100 });

    expect(res.status).toBe(201); // Now this will match
    expect(res.body.id).toBeDefined();
  });
});