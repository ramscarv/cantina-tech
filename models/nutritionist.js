import {Schema, model, models} from "mongoose";

const NutritionistSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this nutritionist'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email for this nutritionist'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password for this nutritionist'],
    },
    cpf: {
        type: String,
        unique: true,
        required: [true, 'Please provide a CPF for this nutritionist'],
    },
    role: {
        type: String,
        enum: ['regular', 'admin'],
        default: 'admin'
    }
});

const Nutritionist = models.Nutritionist || model('Nutritionist', NutritionistSchema);

export default Nutritionist;