import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";

export const userUpdateController = async(req, res= response) => {

    const {id} = req.params;

    const { _id, password, is_google, email, ...resto } = req.body;

    if(password){
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }


    const user = await User.findByIdAndUpdate(id, resto);




    res.json({
        msg: 'put API',
        user
    });
}