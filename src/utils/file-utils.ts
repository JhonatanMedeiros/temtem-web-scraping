import { resolve } from 'path';
import { writeFileSync } from 'fs';

export default class FileUtils {

  constructor() { }

  /***
   * Save File HTML
   * @param file
   * @param filePath dist/index.html
   */
  static async saveFileHtml(file: any, filePath?: string): Promise<any> {
    const path: string = `${resolve(process.cwd(), filePath || 'dist/index.html')}`;

    await writeFileSync(path, file, 'utf8');
    console.log('The file was saved!');
  }

  static async saveFileText(list: any[], filePath?: string): Promise<any> {
    const path: string = `${resolve(process.cwd(), filePath || 'dist/temtem-creatues.txt')}`;
    const str: string = JSON.stringify(list, null, 4);

    await writeFileSync(path, str, 'utf8');
    console.log('The file was saved!');
  }
}
