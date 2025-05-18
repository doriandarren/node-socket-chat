import { response } from "express";
import { Product } from "../../models/product.js";

export const productShowController = async(req, res = response) => {

    const {id} = req.params;

    const data = await Product.findById(id)
                        .populate('user', 'name')
                        .populate('category', 'name');

    return res.json(data);
}