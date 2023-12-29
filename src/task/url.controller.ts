import {Controller, Get, NotFoundException, Param, Redirect} from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {

    constructor(private readonly urlService:UrlService) {}

    @Get()
    getHello(): string {
        return this.urlService.getHello();
    }

    @Get('/api/:url')
    async createUrlRecord(@Param('url') url: string) {
        return this.urlService.createUrlRecord(url);
    }

    @Get(':shortenedUrl')
    @Redirect('', 302)
    async redirectToOriginalUrl(@Param('shortenedUrl') shortenedUrl: string) {
        const originalUrl = await this.urlService.getOriginalUrlByShortenedUrl(shortenedUrl);
        console.log(originalUrl)

        if (originalUrl) {
            console.log("test: "+originalUrl)
            return { url: 'http://' + originalUrl }; // Manually prepend 'http://' if needed
        } else {
            return { url: '/urls/list', statusCode: 302 }; // Redirect to the list page if short URL not found
        }
    }

}
