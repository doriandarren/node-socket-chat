import { Socket } from "socket.io";


export const socketController = async(socket = new Socket()) => {
    
    console.log('cliente conectado', socket.id);

    
}