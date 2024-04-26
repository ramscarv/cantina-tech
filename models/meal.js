import { Schema, model, models } from "mongoose";

const MealSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this meal'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this meal'],
    },
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    madeUpFor: {
        type: Number,
        required: [true, 'Please provide a description for this meal'],
    },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Meal = models.Meal || model('Meal', MealSchema);

export default Meal;