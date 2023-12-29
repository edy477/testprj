import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { UrlModule } from './task/url.module';
// Import the Task entity class

// TypeOrmModule database integration
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { dbdatasource } from './task/data.source';
import {UrlService} from "./task/url.service";
import {UrlSeederService} from "./task/url-seeder.service";
import {UrlEntity} from "./task/url.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(dbdatasource),
    TypeOrmModule.forFeature([UrlEntity]),
    UrlModule,
  ],
  controllers: [AppController], 
  providers: [UrlService, UrlSeederService],
})

export class AppModule {
  constructor(private readonly urlSeederService: UrlSeederService) {
    this.seed();
  }

  async seed(): Promise<void> {
    await this.urlSeederService.seed();
  }
}
