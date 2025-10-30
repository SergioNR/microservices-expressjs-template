import { connectToAMQP } from "./queueConnection.js";

export const consumeQueue = async () => {
    try {    
    const messageQueue = await connectToAMQP();
    console.log(`Ready to receive messages in queue ${messageQueue}...`);

    const consumer = await messageQueue.subscribe({ noAck: false }, async (msg) => {
      try {
        const content = msg.bodyToString();
        console.log("Received message:", content);
        
        // Process the message here
        // For example, parse JSON content:
        // const data = JSON.parse(content);
        
        // Acknowledge the message
        await msg.ack();
      } catch (error) {
        console.error("Error processing message:", error);
        // Reject the message and requeue it
        await msg.nack(true);
      }
    });

    // Keep the consumer running
    return consumer;
  } catch (error) {
    console.error("Error in consumer:", error);
    setTimeout(consumeQueue, 1000); // Reconnect after 1 second
  }}