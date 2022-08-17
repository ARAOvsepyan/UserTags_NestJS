import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdGlAZ21haWwucnUiLCJpYXQiOjE2NjAyODc1NzAsImV4cCI6MTY2MDI5MTE3MH0.3kqrxe8nqMt_-we_MxpdTGuXB38AFxykC3oFNgxMLt8',
    description: 'JWT',
  })
  readonly token: string;
}
