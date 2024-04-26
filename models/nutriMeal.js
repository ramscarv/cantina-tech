import { Schema, model, models } from "mongoose";

const NutriMealSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this meal'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for this meal'],
    },
    neededIngredients: {
        type: Array,
        required: [true, 'Please provide a description for this meal'],
    },
    madeUpFor: {
        type: Number,
        required: [true, 'Please provide a description for this meal'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const NutriMeal = models.NutriMeal || model('NutriMeal', NutriMealSchema);

export default NutriMeal;