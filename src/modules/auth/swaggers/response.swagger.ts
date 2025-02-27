import { ApiProperty } from '@nestjs/swagger';

import { Meta } from 'src/common/swaggers';

export class SwgLogin {
  @ApiProperty()
  meta: Meta;

  @ApiProperty({
    example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMSIsInVzZXJu
    YW1lIjoicnVzZGlmeiIsIm5hbWUiOiJmYXV6YW4gcnVzZGkiLCJlbWFpbCI6ImZhdXphbnJ1c2RpMjBAZ
    21haWwuY29tIiwicGhvbmUiOm51bGwsIndlYnNpdGUiOm51bGwsInN0cmVldCI6bnVsbCwic3VpdGUiOm51
    bGwsImNpdHkiOm51bGwsInppcGNvZGUiOm51bGwsImdlb19sYXQiOm51bGwsImdlb19sbmciOm51bGwsImNvbXBh
    bnlfbmFtZSI6bnVsbCwiY29tcGFueV9jYXRjaFBocmFzZSI6bnVsbCwiY29tcGFueV9icyI6bnVsbCwiY3JlYXRlZF9h
    dCI6IjIwMjUtMDItMjdUMjM6MjA6NDIuMjUyWiIsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYXQiOiIyMDI1LTAyLTI
    3VDIzOjIwOjQyLjI1MloiLCJ1cGRhdGVkX2J5IjpudWxsLCJkZWxldGVkX2F0IjpudWxsfSwiaWF0IjoxNzQwNjk4NDU5fQ.CS
    Bc-uQUgDq7eVpWgshVS0I7tH6VyjxE6VUs0_Z2W3E`,
  })
  data: string;
}
