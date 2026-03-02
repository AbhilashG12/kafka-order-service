import { measureMemory } from "node:vm";
import {kafka} from "./KafkaClient.js"
export async function startOrderConsumer(){
    const consumer = kafka.consumer({groupId:"notification-service"});

    await consumer.connect();
    await consumer.subscribe({topic:"order-created",fromBeginning:true});

    await consumer.run({
        eachMessage : async({message}) =>{
            if (!message.value) {
                console.warn("Received a tombstone or empty message");
                return;
            }
            const event = JSON.parse(message.value.toString())
            console.log("order created event received : " , event)
        }
    })
}