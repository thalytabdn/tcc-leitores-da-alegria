import mongoose, { Document, Schema } from 'mongoose';

export interface AudioBookDTO {
  title: string;
  description: string;
  url: string;
}

export interface IAudioBookModel extends AudioBookDTO, Document {}

const AudioBookSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<AudioBookDTO>('AudioBook', AudioBookSchema);
