import { response } from "express";


export const validateUploadFile = (req, res = response, next) => {
    

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'No hay archivos que subir - archivo'}); 
    }

    next();

}