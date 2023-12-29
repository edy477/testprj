// src/url/url-seeder.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';

@Injectable()
export class UrlSeederService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
    ) {}

    async seed(): Promise<void> {
        const seedData = {
            url_id: 15,
            url_original: 'www.youtube.com',
            url_shortened: '1o3E0S',
            title: '',
            counter: 1,
        };

        const existingUrl = await this.urlRepository.findOne({
            where: { url_original: seedData.url_original },
        });

        if (!existingUrl) {
            await this.urlRepository.save(this.urlRepository.create(seedData));
            console.log('Seed data added successfully.');
        } else {
            console.log('Seed data already exists.');
        }
    }
}
