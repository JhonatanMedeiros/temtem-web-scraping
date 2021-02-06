// Crawler Import
import TemtemCrawler from '../TemtemCrawler';

// Models Imports
import { ITemtemCreature } from '../model/temtem-creature-model';

// Utils Imports
import * as log from '../../utils/log';
import { UrlUtils } from '../../utils/url-utils';
import { typedToArray } from '../../utils/cheerioHelpers';
import { cleanToNumber } from '../../utils/cleaners';

const UNSAFE_NAME_REGEX = /\//;

const getTemtemCreatues = async (crawler: TemtemCrawler): Promise<ITemtemCreature[]> => {
  log.info('Starting');

  return new Promise<ITemtemCreature[]>((resolve, reject) => {
    crawler.direct({
      uri: UrlUtils.setUrl(),

      // The global callback won't be called
      callback: async (error, res): Promise<any> => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }

        log.info('Running');
        const $ = res.$;

        if (!$) {
          reject();
          process.exit();
        }

        const temtemRows = $('table.temtem-list > tbody > tr').filter((i, el) => {
          return !!$(el).find('td').length;
        });

        log.info(`Found ${temtemRows.length} temtem`);

        const temtemList = typedToArray<ITemtemCreature>(
          temtemRows.map((i, row) => getTemInfoFromRow($, row))
        ).filter(({ number: num, name }) => num !== 0 && !UNSAFE_NAME_REGEX.test(name));

        if (temtemList.length) {
          log.info('Example received:', JSON.stringify(temtemList[0]));
          resolve(temtemList);
        }

        resolve([]);
      }
    });
  });
};

const getTemInfoFromRow = ($: JQueryStatic, row: HTMLElement): ITemtemCreature => {
  const [number, name, types, hp, sta, spd, atk, def, spatk, spdef, total] = $(row)
    .find('td')
    .text()
    .split('\n')
    .map(t => t.trim().replace('#', ''))
    .map(t => (isNaN(Number(t)) ? t : Number(t)));
  const portraitWikiUrl = $(row)
    .find('img')
    .attr('src')
    .trim()
    .replace(/\?.*/, '')
    .replace(/\/revision\/latest\/scale-to-width.*$/, '');
  return {
    number: number as number,
    name: name as string,
    types: [].concat((types as string).replace(/(.)([A-Z])/g, '$1 $2').split(' ')) as string[],
    portraitWikiUrl,
    lumaPortraitWikiUrl: '',
    wikiUrl: `https://temtem.gamepedia.com/${name}`,
    stats: {
      hp: cleanToNumber(hp),
      sta: cleanToNumber(sta),
      spd: cleanToNumber(spd),
      atk: cleanToNumber(atk),
      def: cleanToNumber(def),
      spatk: cleanToNumber(spatk),
      spdef: cleanToNumber(spdef),
      total: cleanToNumber(total)
    }
  };
};

export default getTemtemCreatues;
