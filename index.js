import  express from 'express'
import { createServer } from 'http';
import { globalErrorHandler } from './middleware/globalErrorHandler.js';
import { bindQueue, connectToAMQP, declareDirectExchange, declareQueue } from './config/messageBroker/queueConnection.js';
import { sendMessageToExchange } from './config/messageBroker/publisher.js';
import { consumeQueue } from './config/messageBroker/consumer.js';

const app = express();
const server = createServer(app);


declareDirectExchange('exampleExchange');
declareQueue('exampleQueue');
bindQueue('exampleQueue', 'exampleExchange', 'exampleRoutingKey');



// sendMessageToExchange()
// consumeQueue()

//* Middleware to catch & handle errors
app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})

const gracefulShutdown = () => {
    console.log('Received shutdown signal, closing server...');
    console.log('LavinMQ connection closed'); // TODO -- add graceful disconnection from LavinMQ

    server.close(() => {
    console.log('Express server closed');
    
    process.exit(0);
    });

  // Force shutdown after timeout
    setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);