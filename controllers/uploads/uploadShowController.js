import { response } from "express";
import fs from 'fs';
import { User } from "../../models/user.js";
import { Product } from "../../models/product.js";






export const uploadShowController = async(req, res = response) => {
    
    const { collection, id } = req.params;
    
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);

            if(!model){
                return res.status(400).json({
                    msg: `No existe usuario id ${ id }`
                });
            }
            break;

        case 'products':
            model = await Product.findById(id);

            if(!model){
                return res.status(400).json({
                    msg: `No existe producto id ${ id }`
                });
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se olvido validar esto'});
    }
    
    
    if( model.img ){
        //const pathImage = path.join(process.cwd(), 'uploads', collection, model.img);
        if( fs.existsSync(model.img)){
            return res.sendFile( model.img );
        }
    }


   return res.json({ msg: 'Falta place hplder' });


}