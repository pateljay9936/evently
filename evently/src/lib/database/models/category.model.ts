import { Schema, model, models,Document } from 'mongoose';

export interface ICategoty extends Document {
    _id: string;
    name: string;
}

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true },  
})

const Category = models.Category || model('Category', CategorySchema);

export default Category;

