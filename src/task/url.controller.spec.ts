// url.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';

describe('UrlController', () => {
    let controller: UrlController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UrlController],
            providers: [UrlService],
        }).compile();

        controller = module.get<UrlController>(UrlController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should redirect to original URL if shortened URL exists', async () => {
        const shortenedUrl = '1o3E0S';
        jest.spyOn(controller['urlService'], 'getOriginalUrlByShortenedUrl').mockResolvedValue('www.youtube.com');

        const result = await controller.redirectToOriginalUrl(shortenedUrl);

        expect(result.url).toBe('www.youtube.com');
        expect(result.statusCode).toBe(302);
    });

    it('should redirect to /urls/list if shortened URL does not exist', async () => {
        const shortenedUrl = 'nonexistent';
        jest.spyOn(controller['urlService'], 'getOriginalUrlByShortenedUrl').mockResolvedValue(null);

        const result = await controller.redirectToOriginalUrl(shortenedUrl);

        expect(result.url).toBe('/urls/list');
        expect(result.statusCode).toBe(302);
    });
});
