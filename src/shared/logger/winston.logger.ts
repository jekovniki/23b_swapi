import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';

export class WinstonLogger implements LoggerService {
  private logger: winston.Logger;
  private context?: string;

  constructor(context?: string) {
    this.context = context;

    const logsDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    const nestJSFormat = winston.format.printf(
      ({ level, message, timestamp, context, ms }) => {
        const pid = process.pid;
        const formattedTimestamp = new Date(timestamp as any).toLocaleString(
          'en-US',
          {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          },
        );

        const logLevel = level.toUpperCase();
        const contextString = context ? `[${context}]` : '';
        const msString = ms ? ` +${ms}ms` : '';

        return `[Nest] ${pid}  - ${formattedTimestamp}     ${logLevel} ${contextString} ${message}${msString}`;
      },
    );

    const consoleFormat = winston.format.printf(
      ({ level, message, timestamp, context, ms }) => {
        const pid = process.pid;
        const formattedTimestamp = new Date(timestamp as any).toLocaleString(
          'en-US',
          {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          },
        );

        // Color mapping for log levels
        const colors: any = {
          error: '\x1b[31m', // Red
          warn: '\x1b[33m', // Yellow
          info: '\x1b[32m', // Green
          debug: '\x1b[34m', // Blue
          verbose: '\x1b[36m', // Cyan
          reset: '\x1b[0m', // Reset
        };

        const logLevel = level.toUpperCase();
        const contextString = context ? `[${context}]` : '';
        const msString = ms ? ` +${ms}ms` : '';
        const colorCode = colors[level] || colors.reset;

        return `${colors.info}[Nest] ${pid} ${colors.reset} - ${formattedTimestamp}     ${colorCode}${logLevel}${colors.warn} ${contextString}${colors.info} ${message}${colors.reset}${msString}`;
      },
    );

    const dateString = new Date().toISOString().split('T')[0];

    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        nestJSFormat,
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            consoleFormat,
          ),
        }),
        new winston.transports.File({
          filename: path.join(logsDir, `${dateString}.application.log`),
          maxsize: 5242880,
          format: nestJSFormat,
        }),
        new winston.transports.File({
          filename: path.join(logsDir, `${dateString}.error.log`),
          level: 'error',
          maxsize: 5242880,
          format: nestJSFormat,
        }),
      ],
    });
  }

  log(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.info(message, { context: logContext });
  }

  error(message: any, trace?: string, context?: string) {
    const logContext = context || this.context;
    this.logger.error(message, { context: logContext, stack: trace });
  }

  warn(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.warn(message, { context: logContext });
  }

  debug(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.debug(message, { context: logContext });
  }

  verbose(message: any, context?: string) {
    const logContext = context || this.context;
    this.logger.verbose(message, { context: logContext });
  }

  setContext(context: string) {
    this.context = context;
  }
}
