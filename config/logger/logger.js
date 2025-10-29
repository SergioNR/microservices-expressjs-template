import pino from 'pino';

const redactOptions = {
  paths: ['context.attribute', 'context.attribute'], // TODO - complete as needed
  censor: '[REDACTED]',
};

const transport = pino.transport({
  redact: redactOptions,
  targets: [
    {
      target: 'pino-pretty',
      options: {
        destination: 1,
        colorize: true,
      },
    },
    // {
    //   target: '@logtail/pino',
    //   options: {
    //     sourceToken: process.env.BETTERSTACK_SOURCE_TOKEN,
    //     options: { endpoint: process.env.BETTERSTACK_INGESTING_HOST },
    //   },
    // },
  ],
});

export const logger = pino(transport);
