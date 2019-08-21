import { Schema, Document, model } from 'mongoose';
import { UserDocument } from './user-schema';

export interface JournalDocument extends Document {
  user: string;
  title: string;
  body: string;
  image: string;
  private: boolean;
  category: string[];
  tags: string[];
  created?: Date;
  updated?: Date;
}

export const journalSchema = new Schema<JournalDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  title: { type: String, required: true },
  body: { type: String, required: true },
  private: { type: Boolean, required: true },
  image: { type: String },
  category: [String],
  tags: [String],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export const Journal = model<JournalDocument>('journal', journalSchema);
