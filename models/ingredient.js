import { Schema, model, models } from "mongoose";


const IngredientSchema = new Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    quality: {
        type: String,
        enum: ['Bom', 'Mediano', 'Ruim'],
        default: 'Mediano'
    },
    validity: {
        type: Date,
    },
    school: { type: Schema.Types.ObjectId, ref: 'School' },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Ingredient = models.Ingredient || model('Ingredient', IngredientSchema);

export default Ingredient;