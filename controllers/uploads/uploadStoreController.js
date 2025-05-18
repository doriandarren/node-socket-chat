import { response } from 'express';
import { fileUpload } from '../../helpers/file-upload.js';






export const uploadStoreController = async(req, res = response) => {

    try {

        //const name = await fileUpload( req.files, ['txt', 'md'], 'textos' );
        const name = await fileUpload( req.files, undefined, 'imgs' );
        return res.json({ name });
        
    } catch (msg) {
        res.status(400).json({ msg });
    }

    

}

