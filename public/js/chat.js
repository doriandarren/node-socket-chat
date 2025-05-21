const url = 'http://localhost:8080/api/auth/';
let user = null;
let socket = null;

// Referencia HTML

const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulUsers = document.querySelector("#ulUsers");
const ulMessage = document.querySelector("#ulMessage");
const btnExit = document.querySelector("#btnExit");



//Validar el token del local Storage
const validateJWT = async() => {
    const token = localStorage.getItem('token');

    if(token.length <= 10){
        window.location = 'index.html';
        throw new Error("No hay token en el servidor");
    }

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    });

    const { user: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    user = userDB;

    document.title = user.name;

    await connectSocket();

}


const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Socket Online');
    });
    
    socket.on('disconnect', () => {
        console.log('Socket Offline');
    });

    socket.on('reciver-message', () => {

    });


    socket.on('active-users', () => {
        
    });


    socket.on('private-message', () => {
        
    });

}


const main = async() => {
    
    await validateJWT();


}


main();
