import { response } from "express";
import { googleVerify } from "../../helpers/google-verify.js";
import { User } from "../../models/user.js";
import { generarJWT } from "../../helpers/generar-jwt.js";


export const authGoogleController = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { name, img, email } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if(!user){
            const data = {
                name,
                email,
                password: ':P',
                img,
                is_google: true
            }

            user = new User(data);
            await user.save();
        }


        if(!user.is_state){
            return res.status(401).json({
                msg: 'Hable con el Administrador, usuario bloqueado'
            })
        }



        const token = await generarJWT( user.id );


        return res.json({
            user,
            token
        })

    } catch (error) {
        res.status(400).json({
            msg: 'El token no se puso verificar',
            ok: false,
        })
    }

    
}