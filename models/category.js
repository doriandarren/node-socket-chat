import mongoose from "mongoose";

const { Schema } = mongoose;

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El name es obligatorio'],
        unique: true
    },
    is_state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorySchema.methods.toJSON = function() {
    const { __v, is_state, ...data } = this.toObject();
    return data;
}

export const Category = mongoose.model('Category', CategorySchema);

