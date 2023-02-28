import { Schema, model, models } from "mongoose";

const orderClientScheme = new Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    number: {
        type: String,
        required: true
    },
    addres: {
        type: String, 
        required: true
    },
    date: { type: Date, default: Date.now },
    status: String, 
    order: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ]
});

module.exports = models.ClientOrder || model("ClientOrder", orderClientScheme);