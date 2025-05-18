import { response } from "express";
import { Product } from "../../models/product.js";

export const productListController = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { is_state: true };

    const [ total, data ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        data
    });
    
}