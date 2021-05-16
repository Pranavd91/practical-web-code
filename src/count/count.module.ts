import { Module } from '@nestjs/common';
import { CountController } from './count.controller';
import { CountService } from './count.service';

@Module({
  controllers: [CountController],
  providers: [CountService]
})
export class CountModule {}
