import {Controller, Get, NotFoundException, Param} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {

    constructor(private readonly urlService:UrlService) {}

    @Get()
    getHello(): string {
        return this.urlService.getHello();
    }

    @Get(':url')
    async createUrlRecord(@Param('url') url: string) {
        return this.urlService.createUrlRecord(url);
    }

}
