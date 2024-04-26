import { Schema, model, models } from "mongoose";

const SchoolSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this school'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide an email for this school'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password for this nutritionist'],
    },
    cnpj: {
        type: String,
        required: [true, 'Please provide a CNPJ for this school'],
    },
    address: {
        address: { type: Schema.Types.ObjectId, ref: 'Address' },
    },
    role: {
        type: String,
        enum: ['regular', 'admin'],
        default: 'regular'
    }
});

const School = models.School || model('School', SchoolSchema);

export default School;