import {ConflictException, Injectable} from '@nestjs/common';

import { UrlEntity } from './url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as urlUtils from 'url';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUrlRecord(urlParam: string): Promise<UrlEntity> {
   /* const parsedUrl = urlUtils.parse(urlParam);
    const domainName = parsedUrl.hostname || ''; // Extract domain name from the URL
    // @ts-ignore
    const existingRecord = await this.urlRepository.findOne({
      url_original: urlParam,
    });
    console.log(existingRecord);
    if (existingRecord) {
      // If a record exists, update the counter field and return the updated record
      existingRecord.counter = (existingRecord.counter || 0) + 1;
      return this.urlRepository.save(existingRecord);
    }



    const newUrlRecord = this.urlRepository.create({ url_original: urlParam, url_shortened: "", counter:0});
    const savedUrlRecord = await this.urlRepository.save(newUrlRecord);
    // Update the "name" field based on the generated ID and base path
    savedUrlRecord.url_shortened = `localhost:3000/${savedUrlRecord.url_id}`;

    return await this.urlRepository.save(newUrlRecord);*/
    try {
      const parsedUrl = urlUtils.parse(urlParam);
      const domainName = parsedUrl.hostname || '';

      // Check if a record with the same URL already exists
      // @ts-ignore
      // @ts-ignore
      let existingRecord = await this.urlRepository.findOne({
        where: [{ url_original: urlParam }],

      });
      console.log(existingRecord);
      if (existingRecord) {
        // If a record exists, update the counter field and return the updated record
        existingRecord.counter = (existingRecord.counter || 0) + 1;
        return this.urlRepository.save(existingRecord);
      }

      // If no record exists, create a new one
      const newUrlRecord = this.urlRepository.create({ url_original: urlParam, url_shortened: "", counter: 0 , title: "" });

      // Save the record to get the generated ID
      const savedUrlRecord = await this.urlRepository.save(newUrlRecord);
      const shortenedUrl = this.generateShortenedUrl();

      // Update the "name" field based on the generated ID and base path
      savedUrlRecord.url_shortened = shortenedUrl; //`localhost:3000/${savedUrlRecord.url_id}`;

      // Save the record again with the updated "name" field
      return await this.urlRepository.save(savedUrlRecord);
      // Existing code
    } catch (error) {
      // Handle duplicate entry error
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('URL already exists');
      } else {
        throw error;
      }
    }
  }

  private generateShortenedUrl(): string {
    // Implement your URL shortening logic here (e.g., using base62 encoding)
    // For simplicity, using a placeholder algorithm
    return this.base62Encode(Math.random().toString(36).substring(2, 8));
  }

  private base62Encode(value: string): string {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    let num = parseInt(value, 36);

    while (num > 0) {
      const remainder = num % 62;
      result = charset[remainder] + result;
      num = Math.floor(num / 62);
    }

    return result || '0';
  }
}
