import { response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../../models/user.js";
import { generarJWT } from "../../helpers/generar-jwt.js";


export const authLoginController = async(req, res = response) => {

    const { email, password } = req.body;


    try {


        const user = await User.findOne({email});

        if ( !user ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email',
            });
        }


        if ( !user.is_state ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - state: false',
            });
        }


        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password',
            });
        }


        const token = await generarJWT( user.id );

        
        res.json({
            user,
            token
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Hable con el administador'
        });
    
    }

    
    
}