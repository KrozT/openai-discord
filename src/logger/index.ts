import {
  createLogger, format, Logger as WinstonLogger, transports,
} from 'winston';
import process from 'process';

export class Logger {
  /**
   * Winston logger instance
   * @protected
   */
  protected _logger: WinstonLogger;

  /**
   * Create logger instance
   * @param serviceName - Name of the service to log
   */
  constructor(serviceName: string) {
    /**
     * Create winston logger instance
     */
    this._logger = createLogger({
      level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
      transports: [
        new transports.Console(),
      ],
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({
          timestamp, level, message, service,
        }) => `[${timestamp}] [${service}] ${level}: ${message}`),
      ),
      defaultMeta: {
        service: serviceName,
      },
    });
  }

  /**
   * Get the logger service instance
   * @returns {WinstonLogger} - Winston logger instance
   */
  get logService(): WinstonLogger {
    return this._logger;
  }
}
