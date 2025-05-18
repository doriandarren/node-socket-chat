import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = Schema({
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
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    description: { type: String },
    enabled: { type: Boolean, default: true },
    img: {type: String},

    
});

ProductSchema.methods.toJSON = function() {
    const { __v, is_state, ...data } = this.toObject();
    return data;
}

export const Product = mongoose.model('Product', ProductSchema);