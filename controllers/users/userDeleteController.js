import { response, request } from "express";
import { User } from "../../models/user.js";



export const userDeleteController = async(req, res= response) => {


    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {is_state: false});
 
    res.json({
        data: user
    });
}