import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {UrlService} from "./task/url.service";

@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @Get()
  @Render('index')
  async listAllUrls() {
    const allUrls = await this.urlService.getAllUrls(); // Call getAllUrls from UrlService
    return { allUrls };
  }
}
