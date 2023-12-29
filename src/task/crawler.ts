// title-crawler.job.ts
import { Job, DoneCallback } from 'bull';
import axios from 'axios';
import { getConnection } from 'typeorm';
import { UrlEntity } from './url.entity';

export const titleCrawlerJob = async (job: Job, done: DoneCallback) => {
    try {
        const urlId = job.data.urlId;
        const urlRecord = await getConnection().getRepository(UrlEntity).findOne(urlId);

        if (urlRecord) {
            const response = await axios.get(urlRecord.url_original);
            const titleMatch = /<title>(.*?)<\/title>/i.exec(response.data);
            const title = titleMatch ? titleMatch[1] : 'Untitled';

            urlRecord.title = title;
            await getConnection().getRepository(UrlEntity).save(urlRecord);
        }

        done();
    } catch (error) {
        console.error('Error in title crawler job:', error);
        done(error);
    }
};
