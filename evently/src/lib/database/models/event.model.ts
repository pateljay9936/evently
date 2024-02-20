import { Schema,model,models,Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description?: string;
    location?: string;
    createdAt?: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    isFree?: boolean;
    price?: number;
    category?: { _id: string; name: string}
    organizer?: { _id : string; fristname: string; lastname: string; }
}

const EventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
    imageUrl: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
    isFree: { type: Boolean, default: false },
    price: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Event = models.Event || model('Event', EventSchema);

export default Event;