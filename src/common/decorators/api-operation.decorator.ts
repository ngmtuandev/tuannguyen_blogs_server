import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

interface IApiOperationDecoratorOptions {
  type?: any;
  summary: string;
  description: string;
}

export function ApiOperationDecorator({
  type,
  summary,
  description,
}: IApiOperationDecoratorOptions) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      type,
      description,
    }),
    ApiUnauthorizedResponse({ description: 'Token is invalid' }), // 401
    ApiForbiddenResponse({ description: 'Do not have permission' }), // 403
    ApiBadRequestResponse({ description: 'Invalid data' }),
    ApiUnprocessableEntityResponse({ description: 'Invalid data' }),
    ApiInternalServerErrorResponse({
      description: 'Internal server error, please try later',
    }),
  );
}
