import { response } from "express";
import { User } from "../../models/user.js";
import { Product } from "../../models/product.js";
import { fileUpload } from "../../helpers/file-upload.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fs from 'fs';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const uploadUpdateController = async(req, res = response) => {

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
            fs.unlinkSync( model.img );
        }
    }


    const name = await fileUpload( req.files, undefined, collection );
    model.img = name;

    await model.save();

    return res.json(model);
}