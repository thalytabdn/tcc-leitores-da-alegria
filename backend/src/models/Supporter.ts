import mongoose, { Document, Schema } from 'mongoose';

export interface SupporterDTO {
  name: string;
  image: string;
  description: string;
}

export interface ISupporterModel extends SupporterDTO, Document {}

const SupporterSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<SupporterDTO>('Supporter', SupporterSchema);
