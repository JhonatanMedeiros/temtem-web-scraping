import * as log from '../utils/log';
import TemtemCrawler from './TemtemCrawler';
import getTemtemCreatues from './data/getTemtemCreatures';
import saveToDatabase from './saveToDatabase';

export interface IRobotOptions {
  useDataBase?: boolean;
  saveOnFile?: boolean;
}

export default class Robot {

  private crawler: TemtemCrawler;

  private readonly opts: IRobotOptions = { useDataBase: false, saveOnFile: false};

  constructor(opts?: IRobotOptions) {
    this.opts = Object.assign(this.opts, opts);
  }

  public start(): void {
    (async () => {
      this.crawler = new TemtemCrawler();
      await this.startCrawler();
      process.exit();
    })().catch(e => {
      log.error(e);
      throw e;
    });
  }

  private async startCrawler(): Promise<any> {
    await saveToDatabase('temtem_creatures', await getTemtemCreatues(this.crawler));
  }

}
