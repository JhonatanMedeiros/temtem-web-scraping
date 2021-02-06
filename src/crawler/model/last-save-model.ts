import * as connections from '../../config/connection/connection';
import { Document, Schema } from 'mongoose';

interface ILastSave extends Document {
  codecKey?: string;
  lastUpdatedAt?: string;
}

export const LastSaveSchema: Schema = new Schema<ILastSave>({
  codecKey: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  lastUpdatedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
}, {
  collection: 'last_save',
  versionKey: false,
  timestamps: false
});

export default connections.db.model<ILastSave>('LastSave', LastSaveSchema);
