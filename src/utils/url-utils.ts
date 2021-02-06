import config from '../config/env/index';

export class UrlUtils {

  static setUrl(params: IParams[] = []): string {
    const url: URL = new URL(config.URL);

    params.forEach((item) => {
      url.searchParams.set(item.key, item.value.toString());
    });

    return url.href;
  }
}

export interface IParams {
  key: string;
  value: string | number;
}
