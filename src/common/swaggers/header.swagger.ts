import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function CommonHeaders() {
  return applyDecorators(
    ApiHeader({
      name: 'api-key',
      required: true,
      examples: {
        'api-key': {
          summary: 'api-key',
          value: 'https://rb.gy/1e7y4t',
        },
      },
    }),
  );
}

export const AuthorizationHeader = (required = false) => {
  return {
    name: 'Authorization',
    required,
    examples: {
      Authorization: {
        summary: 'Authorization',
        value:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJuYW1lIjoicnVzZGlmeiIsIm5hbWUiOiJmYXV6YW4gcnVzZGkiLCJlbWFpbCI6ImZhdXphbnJ1c2RpMjBAZ21haWwuY29tIiwicGhvbmUiOm51bGwsIndlYnNpdGUiOm51bGwsInN0cmVldCI6bnVsbCwic3VpdGUiOm51bGwsImNpdHkiOm51bGwsInppcGNvZGUiOm51bGwsImdlb19sYXQiOm51bGwsImdlb19sbmciOm51bGwsImNvbXBhbnlfbmFtZSI6bnVsbCwiY29tcGFueV9jYXRjaFBocmFzZSI6bnVsbCwiY29tcGFueV9icyI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjUtMDItMjdUMjM6MjA6NDIuMjUyWiIsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDI1LTAyLTI3VDIzOjIwOjQyLjI1MloiLCJ1cGRhdGVkX2J5IjpudWxsLCJkZWxldGVkX2F0IjpudWxsfSwiaWF0IjoxNzQwNjk4NDU5fQ.CSBc-uQUgDq7eVpWgshVS0I7tH6VyjxE6VUs0_Z2W3E',
      },
    },
  };
};
