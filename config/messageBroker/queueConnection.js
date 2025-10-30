import { AMQPClient } from "@cloudamqp/amqp-client"

export const connectToAMQP = async () => {
    try {
      const amqp = new AMQPClient(process.env.LAVINMQ_HOST)
      const amqpConnection = await amqp.connect()
      const channel = await amqpConnection.channel()
  
      return channel;

    } catch (e) {
      console.error("ERROR", e)
      // Note: e.channelConnection might not exist, so we check first
      if (e.channelConnection) {
        e.channelConnection.close()
      }
      setTimeout(connectToAMQP, 1000) // will try to reconnect in 1s
    }
  }

export const declareDirectExchange = async (exchangeName) => {
  const channel = await connectToAMQP()

  await channel.exchangeDeclare(exchangeName, 'direct', {
        internal: false,
        autoDelete: false,
        durable: true
      });

      return;
}

export const declareQueue = async (queueName) => {
  const channel = await connectToAMQP()

  const queue = await channel.queueDeclare(queueName, {
        exclusive: false,
        autoDelete: false,
        durable: true
      });

      return queue;
}

export const bindQueue = async (queueName, exchangeName, routingKey) => {
  const channel = await connectToAMQP()

  await channel.queueBind(queueName, exchangeName, routingKey,{
        // No args
      });

      return;
}