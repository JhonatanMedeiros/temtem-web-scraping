import * as log from '../utils/log';
import TemtemCreatureSchema from './model/temtem-creature-model';
import LastSaveSchema from './model/last-save-model';
import asyncForEach from '../utils/asyncForEach';
import { Model } from 'mongoose';
// @ts-ignore
import differenceInMinutes from 'date-fns/differenceInMinutes';

interface ICodedec {
  documentModel: Model<any>;
}

const TemtemCreatureCodec: ICodedec = {
  documentModel: TemtemCreatureSchema
};

const DatadaseCodec = {
  temtem_creatures: TemtemCreatureCodec
};

type Codec = keyof typeof DatadaseCodec;

export default async function saveToDatabase(codecKey: Codec, data: any): Promise<any> {
  try {
    const awaitedData = await (typeof data === 'function' ? data() : data);
    const itemCount = Array.isArray(awaitedData) ? awaitedData.length : 1;
    log.info(`Checking ${itemCount} ${codecKey} item${itemCount === 1 ? '' : 's'}`);

    const codec = DatadaseCodec[codecKey];

    if (codec) {
      const saveToDb = await checkLastSave(codecKey);
      if (saveToDb) {
        await saveDB(codecKey, codec, awaitedData);
      } else {
        return undefined;
      }
    } else {
      log.warn(`No codec found to enforce for: "${codecKey}"`);
      return undefined;
    }
  } catch (e) {
    log.error(`Problem processing ${codecKey}: ${e.message}`);
    return undefined;
  }
}

async function saveDB(codecKey: Codec, codec: ICodedec, data: any[]) {
  const { documentModel } = codec;

  await documentModel.deleteMany({});

  let lastSaveIndex = 0;
  await asyncForEach(data, lastSaveIndex, async (value: any, index: number) => {
    try {
      await documentModel.create(value);
      log.info(`[DB] - Success - ${JSON.stringify(value)}`);
    } catch (e) {
      log.error('[DB] - Fail to save');
      throw new Error(e.message);
    }
    lastSaveIndex = index + 1;
  });

  const founded = await LastSaveSchema.findOneAndUpdate({ codecKey }, { lastUpdatedAt: new Date().toISOString() });

  if (!founded) {
    await LastSaveSchema.create({ codecKey, lastUpdatedAt: new Date().toISOString() });
  }
}

async function checkLastSave(codecKey: Codec): Promise<any> {
  const lastSave = await LastSaveSchema.findOne({ codecKey });

  if (!lastSave) {
    return true;
  }

  console.log(lastSave);

  const result = differenceInMinutes(
    new Date(),
    lastSave.lastUpdatedAt
  );
  console.log(result);
  return result > 1;

}
