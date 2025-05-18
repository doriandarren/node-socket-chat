import { User } from "../../models/user.js";
import bcrypt from "bcryptjs";



export const userStoreController = async (req, res= response) => {

    const {name, email, password, rol} = req.body;
    
    const user = new User({name, email, password, rol});

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // Guardar en BD
    await user.save();

    res.json({
        msg: 'post API',
        user
    });
}
