declare module 'crawler' {
  import { IncomingMessage } from 'http';

  export interface CrawlerResponse extends IncomingMessage {
    body: any;
    $: JQueryStatic;
    options: CrawlerOptions;
    request: any;
  }

  export type CrawlerCallback = (
    error: Error,
    res: CrawlerResponse,
    done: () => {}
  ) => void;

  interface JQueryObject {
    name: string;
    options: {
      normalizeWhitespace?: boolean;
      xmlMode?: boolean;
      decodeEntities?: boolean;
    };
  }

  type JQuery = boolean | 'cheerio' | JQueryObject;

  export interface CrawlerOptions {
    uri?: string;
    autoWindowClose?: boolean;
    forceUTF8?: boolean;
    gzip?: boolean;
    incomingEncoding?: string;
    jQuery?: JQuery;
    maxConnections?: number;
    method?: string;
    priority?: number;
    priorityRange?: number;
    rateLimit?: number;
    referer?: boolean;
    retries?: number;
    retryTimeout?: number;
    timeout?: number;
    skipDuplicates?: boolean;
    rotateUA?: boolean;
    homogeneous?: boolean;
    skipEventRequest?: boolean;
    preRequest?: CrawlerCallback;
    callback?: CrawlerCallback;
  }

  class Crawler {
    constructor(options: CrawlerOptions);
    queue(options: string | string[] | CrawlerOptions | CrawlerOptions[]): void;
    direct(options: string | string[] | CrawlerOptions | CrawlerOptions[]): void;
    on(event: string, done: (options?: any) => void): void;
  }

  export default Crawler;
}
