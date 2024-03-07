import { Schema,model,models,Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    description?: string;
    location?: string;
    createdAt?: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    isFree: boolean;
    price: string;
    category?: { _id: string; name: string}
    organizer?: { _id : string; firstName: string; lastName: string; },
    link: string;
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
    price: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User' },
    link: { type: String }
})

const Event = models.Event || model('Event', EventSchema);

export default Event;