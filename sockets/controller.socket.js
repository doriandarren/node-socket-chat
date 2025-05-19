import { Socket } from "socket.io";
import { checkJWT } from "../helpers/generar-jwt.js";



export const socketController = async(socket = new Socket()) => {
    
    //console.log('cliente conectado', socket.id);

    const user = await checkJWT(socket.handshake.headers['x-token']);

    

    if( !user ){
        return socket.disconnect();
    }

    console.log('Se conecto', user.name);

    
}