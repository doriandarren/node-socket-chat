import { response } from "express";
import { Category } from "../../models/category.js";


export const categoryUpdateController = async(req, res = response) => {
    

    const { id } = req.params;
    const { is_state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true});

    return res.json(category);

}