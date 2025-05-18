import { response } from "express";
import { Category } from "../../models/category.js";

export const categoryStoreController = async(req, res = response) => {
    

    const name = req.body.name.toUpperCase();


    const catagoryDB = await Category.findOne({ name });

    if( catagoryDB ){
        return res.status(400).json({
            msg: `La categoria ${catagoryDB.name }, ya existe`
        });
    }


    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save();



    return res.status(201).json(category);

}