import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        required: true
    }
})

module.exports = models.User || model("User", UserSchema);