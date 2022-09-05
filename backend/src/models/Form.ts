import mongoose, { Document, Schema } from 'mongoose';

export interface FormDTO {
  contract: string;
  subscription: string;
}

export interface IFormModel extends FormDTO, Document {}

const FormSchema: Schema = new Schema(
  {
    contract: { type: String, required: true },
    subscription: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<FormDTO>('Form', FormSchema);
