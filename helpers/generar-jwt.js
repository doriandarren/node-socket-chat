import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const generarJWT = (uid = '') => {
    
    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if( err ){
                console.log( err );
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }    
        });

    })

}


export const checkJWT = async(token = '') => {
    
    try {
        
        if(token.length < 10){
            return null;
        }

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById( uid );


        if( user ){

            if(user.is_state){
                return user;
            }else{
                return null;
            }
        }else{
            return null;
        }


    } catch (error) {
        return null;
    }

}