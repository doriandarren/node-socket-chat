import { response } from "express";
import { Product } from "../../models/product.js";

export const productStoreController = async(req, res = response) => {
    
    
    const { is_state, user, name, ...body} = req.body;

    console.log(name);
    
    const dataDB = await Product.findOne({ name });

    if( dataDB ){
        return res.status(400).json({
            msg: `El producto ${dataDB.name }, ya existe`
        });
    }


    const dataNew = {
        ...body,
        name: name.toUpperCase(),
        user: req.user._id,
    }

    const data = new Product(dataNew);

    await data.save();

    return res.status(201).json(data);

}