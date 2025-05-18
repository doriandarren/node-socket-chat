import { response } from "express";
import { Category } from "../../models/category.js";


export const categoryDeleteController = async(req, res = response) => {
    
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {is_state: false}, { new: true});

    return res.json(category);
    
}