import { logger } from './logger.js';

export const logError = (errorMessage, error, additionalInfo = 'N/A') => {
  try {
    logger.error({
      message: errorMessage,
      context: {
        name: error.name,
        errorMessage: error.message,
        // errorStack: error.stack,
        errorDetails: error, // I will log the entire error object for now just in case
        additionalInfo: additionalInfo,
      },
    });

  } catch (err) {
    return;
  }
};

export const logWarn = async (message, error, additionalInfo = 'N/A') => {
  logger.warn({
    message: message,
    context: {
      name: error.name || 'no error name',
      errorMessage: error.message || 'no error message',
      errorStack: error.stack || 'no error stack',
      errorDetails: error, // I will log the entire error object for now just in case
      additionalInfo: additionalInfo,
    },
  });
};

export const logInfo = async (message, context = 'no context') => {
  try {
    logger.info({
      message: message,
      context: context,
    });

  } catch (error) {
    logError(`error in storing INFO logs for: ${message}`, error);
  }
};
