import { CreateOrderUseCase } from "../../application/CreateOrderUseCase.js";
import { FakeOrderDB } from "../db/FakeDb.js";
import { OrderRepoImpl } from "../db/OrderRepoImpl.js";
import { OrderEventProducer } from "../kafka/OrderEventProducer.js";

const fakeDb = new FakeOrderDB()
const orderRepo = new OrderRepoImpl(fakeDb)
const eventRepo = new OrderEventProducer();
export const createOrderUseCase = new CreateOrderUseCase(orderRepo,eventRepo);