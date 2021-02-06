import Crawler, { CrawlerOptions } from 'crawler';
import config from '../config/env/index';

export default class TemtemCrawler extends Crawler {

  constructor() {
    const opts: CrawlerOptions = {
      maxConnections: config.MAX_CONNECTIONS,
      rateLimit: config.RATE_LIMIT,
      jQuery: {
        name: 'cheerio',
        options: {
          normalizeWhitespace: false,
          xmlMode: false,
          decodeEntities: true
        }
      },
      // This will be called for each crawled page
      callback: (error, res, done): void => {
        if (error) {
          console.log(error);
          done();
          process.exit();
        }
        done();
      }
    };

    super(opts);

    /* Emitted when a task is being added to scheduler. **/
    this.on('schedule', (options: any): void => {
      // options.proxy = 'http://proxy:port';
    });

    /* Emitted when crawler is ready to send a request. **/
    this.on('request', (options: any): void => {
      // options.qs.timestamp = new Date().getTime();
    });

    /* Emitted when queue is empty. **/
    this.on('drain', (): void => {
      // For example, release a connection to database.
      // db.close(); // close connection
    });
  }
}
