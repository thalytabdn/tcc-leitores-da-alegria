import mongoose, { Date, Document, Schema } from 'mongoose';

export interface ImageDTO {
  url: string;
  description: string;
}

export interface IImageModel extends ImageDTO, Document {}

const ImageSchema: Schema = new Schema(
  {
    url: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<ImageDTO>('Image', ImageSchema);
