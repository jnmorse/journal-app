import { Schema, Document, model } from 'mongoose';
import { UserDocument } from './user-schema';

export interface JournalDocument extends Document {
  user: UserDocument;
  title: string;
  body: string;
  image: string;
  created: Date;
  updated: Date;
}

export const journalSchema = new Schema<JournalDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  title: { type: String, required: true },
  body: { type: String, required: true },
  image: { type: String },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export const Journal = model<JournalDocument>('journal', journalSchema);
