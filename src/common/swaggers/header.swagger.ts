import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function CommonHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'api-key',
      example: 'https://rb.gy/1e7y4t',
      examples: {
        'api-key': {
          summary: 'api-key',
          value: 'https://rb.gy/1e7y4t',
        },
      },
      required: true,
    }),
  );
}

export const AuthorizationHeader = (required = false) => {
  return {
    name: 'Authorization',
    required,
  };
};
