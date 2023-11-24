import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresModule } from './modules/postgres/postgres.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature(), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
