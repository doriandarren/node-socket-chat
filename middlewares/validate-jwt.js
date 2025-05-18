import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';


export const validateJWT = async(req = request, res = response, next) => {
    
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }


    try {

        const {uid} = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const userDB = await User.findById(uid);

        if( !userDB ){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            });
        }

        if( !userDB.is_state ){
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }


        req.user = userDB;

        //req.uid = uid;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
    
}