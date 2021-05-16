import { Module } from '@nestjs/common';
import { CountController } from './count/count.controller';
import { CountModule } from './count/count.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
     // url: 'mongodb://35.224.45.227:27017/pranav_dixit',
     // username: 'pranav_dixit',
     // password: 'pranav_dixit',
     // database: "pranav_dixit",
      url: 'mongodb://localhost:27017/SMS',
      entities: ["dist/**/*.entity{.ts,.js}"],
      logging: ["query","error"],
      logger: "file",
      extra: { timezone: "+5:30" },
      useUnifiedTopology: true,
      synchronize: true,
    }),
    CountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
