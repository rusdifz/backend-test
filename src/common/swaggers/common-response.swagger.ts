import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty({
    example: 200,
  })
  code: number;

  @ApiProperty({
    example: 'success',
  })
  msg: string;
}

export class Pagination {
  @ApiProperty()
  total: number;

  @ApiProperty()
  total_page: number;

  @ApiProperty()
  page: number;
}

export class MetaUpsert {
  @ApiProperty({
    example: 201,
  })
  code: number;

  @ApiProperty({
    example: 'success',
  })
  msg: string;
}

export class SwgDeleteResp {
  @ApiProperty()
  meta: Meta;

  @ApiProperty()
  data: {};
}
