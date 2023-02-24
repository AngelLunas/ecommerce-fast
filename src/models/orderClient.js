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
    order: [
        {
            id: String,
            quantity: Number
        }
    ]
});

module.exports = models.ClientOrder || model("ClientOrder", orderClientScheme);