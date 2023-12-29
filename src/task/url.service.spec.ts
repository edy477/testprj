// url.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import { UrlService } from './url.service';

describe('UrlService', () => {
    let service: UrlService;
    let repository: Repository<UrlEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UrlService,
                {
                    provide: getRepositoryToken(UrlEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UrlService>(UrlService);
        repository = module.get<Repository<UrlEntity>>(getRepositoryToken(UrlEntity));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAllUrls', () => {
        it('should return an array of UrlEntity', async () => {
            const mockUrls: UrlEntity[] = [{ url_original: 'www.youtube.com',
                url_id:15,
                url_shortened: '1o3E0S',
                title: '',
                counter: 1, }];
            jest.spyOn(repository, 'find').mockResolvedValue(mockUrls);

            const result = await service.getAllUrls();

            expect(result).toEqual(mockUrls);
        });
    });

    describe('getOriginalUrlByShortenedUrl', () => {
        it('should return the original URL if the shortened URL exists', async () => {
            const shortenedUrl = 'xtsfx';
            const mockUrl: UrlEntity = {
                url_id:15,
                url_original: 'www.youtube.com',
                url_shortened: '1o3E0S',
                title: '',
                counter: 1,  };
            jest.spyOn(repository, 'findOne').mockResolvedValue(mockUrl);

            const result = await service.getOriginalUrlByShortenedUrl(shortenedUrl);

            expect(result).toEqual(mockUrl.url_original);
        });

        it('should return null if the shortened URL does not exist', async () => {
            const shortenedUrl = 'nonexistent';
            jest.spyOn(repository, 'findOne').mockResolvedValue(null);

            const result = await service.getOriginalUrlByShortenedUrl(shortenedUrl);

            expect(result).toBeNull();
        });
    });
});
