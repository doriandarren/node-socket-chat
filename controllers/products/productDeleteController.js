import { response } from "express";
import { Product } from "../../models/product.js";

export const productDeleteController = async(req, res = response) => {

    const { id } = req.params;
    
    const data = await Product.findByIdAndUpdate(id, {is_state: false}, { new: true});

    return res.json(data);
}