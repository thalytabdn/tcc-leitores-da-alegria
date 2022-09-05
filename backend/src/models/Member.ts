import mongoose, { Document, Schema } from 'mongoose';

export interface MemberDTO {
  name: string;
  image: string;
  description: string;
}

export interface IMemberModel extends MemberDTO, Document {}

const MemberSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<MemberDTO>('Member', MemberSchema);
