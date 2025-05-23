import { Socket } from "socket.io";
import { checkJWT } from "../helpers/generar-jwt.js";
import { ChatMessages } from "../models/chat-messages.js";


const chatMessages = new ChatMessages();


export const socketController = async(socket = new Socket(), io) => {
    
    //console.log('cliente conectado', socket.id);
    const user = await checkJWT(socket.handshake.headers['x-token']);

    if( !user ){
        return socket.disconnect();
    }

    // Agregra Usuario conectado
    chatMessages.connectUser( user );
    io.emit('active-users', chatMessages.usersArr);
    socket.emit('reciver-message', chatMessages.last10);
   
    // Conectarlo a sala especial
    socket.join( user.is );


    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        chatMessages.disconnectUser( user.id );
        io.emit('active-users', chatMessages.usersArr);
    });
    


    socket.on('send-message', ({ uid, message }) => {

        if( uid ){

            // mensaje privado
            socket.to( uid ).emit('private-message', { of: user.name, message });

        }else{
            chatMessages.sentMessage(user.id, user.name, message);
            io.emit('reciver-message', chatMessages.last10);
        }
        
        
    });



}

