const url = 'http://localhost:8080/api/auth/';
let user = null;
let socket = null;


//Validar el token del local Storage
const validateJWT = async() => {
    const token = localStorage.getItem('token');

    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    });

    const { user: userDB, token: tokenDB } = await resp.json();

    console.log(userDB, tokenDB);

}


const main = async() => {
    
    await validateJWT();

    if(token.length <= 10){
        window.location = 'index.html';
        throw new Error("No hay token en el servidor");
    }


    

}


main();
//const socket = io();