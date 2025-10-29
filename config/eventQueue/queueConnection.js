import { AMQPClient } from "@cloudamqp/amqp-client"

export const connectToEventQueue = async () => {

  try {
    const amqp = new AMQPClient(process.env.LAVINMQ_HOST)
    const amqpConnection = await amqp.connect()
    const channel = await amqpConnection.channel()


    return channel 

  } catch (e) {
    console.error("ERROR", e)
    // Note: e.channelConnection might not exist, so we check first
    if (e.channelConnection) {
      e.channelConnection.close()
    }
    setTimeout(connectToEventQueue, 1000) // will try to reconnect in 1s
  }
};
