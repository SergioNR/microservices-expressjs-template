import { AMQPClient } from "@cloudamqp/amqp-client"

export let exchange;

const connectToAMQP = async () => {

  if (exchange) {
    return exchange;
  } else {
    try {
      const amqp = new AMQPClient(process.env.LAVINMQ_HOST)
      const amqpConnection = await amqp.connect()
      const channel = await amqpConnection.channel()
  
  
      const exchange = await channel.exchangeDeclare('exampleExchange', 'direct', {
        internal: false,
        autoDelete: false,
        durable: true
      });
  
      await channel.queueDeclare('exampleQueue',{
        exclusive: false,
        autoDelete: false,
        durable: true
      });
      
      await channel.queueBind('exampleQueue', 'exampleExchange', 'exampleMessage',{
        // No args
      });

      return channel

    } catch (e) {
      console.error("ERROR", e)
      // Note: e.channelConnection might not exist, so we check first
      if (e.channelConnection) {
        e.channelConnection.close()
      }
      setTimeout(connectToAMQP, 1000) // will try to reconnect in 1s
    }
  }
};