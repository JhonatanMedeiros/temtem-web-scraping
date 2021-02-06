import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

/**
 * @export
 * @interface ITemtemCreature
 */
export interface ITemtemCreature {
  number: number;
  name: string;
  types: string[];
  portraitWikiUrl: string;
  lumaPortraitWikiUrl: string;
  wikiUrl: string;
  stats: {
    hp: number;
    sta: number;
    spd: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    total: number;
  };
}

export const TemtemCreatureSchema: Schema = new Schema({
  number: {
    type: Number,
    unique: true,
    trim: true,
    required: true
  },
  name: String,
  types: [String],
  portraitWikiUrl: String,
  lumaPortraitWikiUrl: String,
  wikiUrl: String,
  stats: {
    hp: Number,
    sta: Number,
    spd: Number,
    atk: Number,
    def: Number,
    spatk: Number,
    spdef: Number,
    total: Number,
  }
}, {
  collection: 'temtem_creatues',
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default connections.db.model('Temtem', TemtemCreatureSchema);
