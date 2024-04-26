import { Schema, model, models } from 'mongoose';

const AddressSchema = new Schema({
    street: {
        type: String,
    },
    district: {
        type: String,
    },
    number: {
        type: Number,
    },
    CEP: {
        type: String,
    },
});

const Address = models.Address || model('Address', AddressSchema);

export default Address;