import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const requestId = `req-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const startTime = Date.now();
    const bodyString =
      JSON.stringify(request?.body) !== '{}'
        ? `, Body : ${JSON.stringify(request?.body)}`
        : '';
    this.logger.log(
      `Incoming request - RequestId: ${requestId}, Method: ${method}, URL: ${url}${bodyString}`,
      context.getClass().name,
    );

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const logType = statusCode >= 400 ? 'error' : 'log';

        this.logger[logType](
          `Otgoing response - RequestId: ${requestId}, Method: ${method}, URL: ${url}, Status: ${statusCode}`,
          context.getClass().name,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        const statusCode = error.status || error.statusCode || 500;

        const errorMessage = `Error response: ${method} ${url} - Status: ${statusCode} - Duration: ${duration}ms`;
        this.logger.error(errorMessage, {
          context: context.getClass().name,
          requestId,
          error: {
            message: error.message,
            stack: error.stack,
            response: error.response,
          },
        });

        // Re-throw the error to maintain normal exception flow
        throw error;
      }),
    );
  }
}
