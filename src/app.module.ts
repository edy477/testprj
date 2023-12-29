import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UrlModule } from './task/url.module';
// Import the Task entity class

// TypeOrmModule database integration
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { dbdatasource } from './task/data.source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    UrlModule,
  ],
  controllers: [AppController], 
  providers: [AppService], 
})

export class AppModule {} 
