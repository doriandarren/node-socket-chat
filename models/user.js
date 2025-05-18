
import mongoose from "mongoose";

const { Schema } = mongoose;

export const UserSchema = new Schema({
    name: {
        type: String,
        required:[true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required:[true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    is_state: {
        type: Boolean,
        default: true        
    },
    is_google: {
        type: Boolean,
        default: false
    },

});



UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...data } = this.toObject();
    data.uid = _id;
    return data;
}



export const User = mongoose.model('User', UserSchema);