// Import modules and components
import { Module } from '@nestjs/common'; 
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
// TypeOrmModule creates your database integration
import { TypeOrmModule } from '@nestjs/typeorm'; 
// Your Task entity class
import { UrlEntity } from './url.entity';

@Module({
  // create an import module
  // add TypeOrmModule to Task entity
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
