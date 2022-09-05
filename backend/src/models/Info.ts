import mongoose, { Date, Document, Schema } from 'mongoose';

export interface InfoDTO {
  title: string;
  text: string;
}

export interface IInfoModel extends InfoDTO, Document {}

const InfoSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<InfoDTO>('Info', InfoSchema);
