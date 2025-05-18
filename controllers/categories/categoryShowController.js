import { response } from "express";
import { Category } from "../../models/category.js";


export const categoryShowController = async(req, res = response) => {

    const {id} = req.params;

    const data = await Category.findById(id).populate('user', 'name');

    return res.json(data);

}