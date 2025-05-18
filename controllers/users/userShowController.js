import { User } from "../../models/user.js";


export const userShowController = async(req, res= response) => {

    const {id} = req.params;

    //const uid = req.uid;

    const user = await User.findById(id);
    const userAuth = req.user;

    res.json({
        msg: 'show API',
        user, 
        userAuth
    });
}