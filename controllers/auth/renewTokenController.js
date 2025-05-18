import { response } from "express";
import { generarJWT } from "../../helpers/generar-jwt.js";

export const renewTokenController = async(req, res = response) => {

    const { user } = req;

    const token = await generarJWT( user.id );

    return res.json({
        user,
        token
    });
}