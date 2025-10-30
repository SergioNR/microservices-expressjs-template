import { connectToAMQP, declareQueue } from "./queueConnection.js";


export const sendMessageToExchange = async (queueName, message) => {
    try {
        
        const messageQueue = await declareQueue();
        for (let i = 0; i < 10; i++) {

            await messageQueue.publish(`${i}`);
        }

    } catch (error) {
        console.error('Error sending message to queue:', error);
        throw error;
    }
}
