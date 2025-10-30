import { connectToAMQP } from "./queueConnection.js";

export const consumeQueue = async (queueName) => {
  try {
    const channel = await connectToAMQP();
    const queue = await channel.queue(queueName);

    console.log(`Ready to receive messages in ${queueName} queue...`);

    const consumer = await queue.subscribe({ noAck: false }, async (msg) => {
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
  }
};
