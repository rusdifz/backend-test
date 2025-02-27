import { Module } from '@nestjs/common';
import { HttpRequestService } from './http.service';

@Module({
  providers: [HttpRequestService],
  exports: [HttpRequestService],
})
export class HttpRequestModule {}
