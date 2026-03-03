import { describe, it, expect } from '@jest/globals';
import { FakeOrderDB } from "../../infrastructure/db/FakeDb.js";
import { OrderRepoImpl } from "../../infrastructure/db/OrderRepoImpl.js";

describe("OrderRepoImpl", () => {
  it("should save order to FakeDB", async () => {
    const db = new FakeOrderDB();
    const repo = new OrderRepoImpl(db);

    const order = { id: "101", userId: "1", amount: 2000 };
    await repo.save(order);

    const result = await db.getById("101");
    expect(result).toEqual(order);
  });
});