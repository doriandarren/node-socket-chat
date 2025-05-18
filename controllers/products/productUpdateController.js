import { response } from "express";
import { Product } from "../../models/product.js";

export const productUpdateController = async(req, res = response) => {

    const { id } = req.params;
    const { is_state, user, ...dataNew } = req.body;

    if(dataNew.name){
        dataNew.name = dataNew.name.toUpperCase();
    }
    
    dataNew.user = req.user._id;

    const data = await Product.findByIdAndUpdate(id, dataNew, { new: true});

    return res.json(data);

}