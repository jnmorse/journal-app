import { Schema, Document, model } from 'mongoose';

export interface JournalDocument extends Document {
  title: string;
  body: string;
  image: string;
  private: boolean;
  category: string;
  tags: string[];
  created?: Date;
  updated?: Date;
}

export const journalSchema = new Schema<JournalDocument>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  private: { type: Boolean, required: true },
  image: { type: String },
  category: { type: String },
  tags: [String],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

export const Journal = model<JournalDocument>('journal', journalSchema);
