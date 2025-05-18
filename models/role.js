import mongoose from "mongoose";

const { Schema } = mongoose;


const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


export const Role = mongoose.model('Role', RoleSchema);