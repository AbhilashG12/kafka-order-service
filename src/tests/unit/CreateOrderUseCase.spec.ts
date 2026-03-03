import { describe, it, expect, jest } from '@jest/globals';
import { CreateOrderUseCase } from '../../application/CreateOrderUseCase.js';

describe("CreateOrderUseCase", () => {
  it("should save order and publish event", async () => {
    const mockOrderRepo = { 
        save: jest.fn<any>().mockResolvedValue(null) 
    };
    const mockEventRepo = { 
        publishOrderCreated: jest.fn<any>().mockResolvedValue(null) 
    };

    const useCase = new CreateOrderUseCase(
      mockOrderRepo as any,
      mockEventRepo as any
    );

    const order = { id: "1", userId: "10", amount: 500 };
    
    const result = await useCase.execute(order);

    expect(mockOrderRepo.save).toHaveBeenCalledWith(order);
    expect(mockEventRepo.publishOrderCreated).toHaveBeenCalledWith({
      orderId: order.id,
      userId: order.userId,
      amount: order.amount,
    });

    expect(result.status).toBe("ORDER_CREATED_AND_EVENT_PUBLISHED");
  });
});