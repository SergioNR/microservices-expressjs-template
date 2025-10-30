import { connectToAMQP } from "./queueConnection.js";

export const sendMessageToExchange = async (queueName, message) => {
    try {
        
        const messageSent = await channel.basicPublish('exampleExchange', 'exampleQueue', 'exampleData')
        

    } catch (error) {
        console.error('Error sending message to queue:', error);
        throw error;
    }
}
