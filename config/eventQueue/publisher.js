import { connectToEventQueue } from "./queueConnection.js";

export const sendMessageToQueue = async (queueName, message) => {
    try {
        const channel = await connectToEventQueue();
        const queue = await channel.queue(queueName);
        
        await queue.publish(message, { 
            deliveryMode: 2 
        });

    } catch (error) {
        console.error('Error sending message to queue:', error);
        throw error;
    }
}