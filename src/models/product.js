import { Schema, models, model } from "mongoose";

const productScheme = new Schema ({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    description: {
        type: String, 
        required: [true, 'description is required']
    },
    srcImage: {
        type: String, 
        required: [true, 'img is required']
    },
    price: {
        type: Number, 
        required: [true, 'price is required']
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    }
});

  
module.exports = models.Product || model("Product", productScheme);