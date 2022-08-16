import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class BackExceptionFilter implements ExceptionFilter {
  catch(e: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const result = this.parseError(e);
    response.json(result);
  }

  parseError(e: any) {
    const error = e.message || e.toString();
    return { error };
  }
}
