import mongoose, { Date, Document, Schema } from 'mongoose';

export interface EventDTO {
  local: string;
  date: Date;
  time: string;
  readersName: string;
  bookName: string;
  bookImage: string;
  bookDescription: string;
}

export interface IEventModel extends EventDTO, Document {}

const EventSchema: Schema = new Schema(
  {
    local: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    readersName: { type: String, required: true },
    bookName: { type: String, required: true },
    bookImage: { type: String, required: false },
    bookDescription: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model<EventDTO>('Event', EventSchema);
