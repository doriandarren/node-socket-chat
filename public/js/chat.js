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

    socket.on('reciver-message', drawMessages );


    socket.on('active-users', drawUsers );


    socket.on('private-message', (payload) => {
        
        console.log('Privado: ', payload);

    });

}


const drawUsers = (users = []) => {

    let usersHTML = '';
    
    users.forEach( ({ name, uid }) => {

        usersHTML += `
            <li>
                <p>
                    <h5 class="text-success">${ name }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>

        `;

    });

    ulUsers.innerHTML = usersHTML;

}


const drawMessages = (messages = []) => {

    let messagesHTML = '';

    console.log(messages);
    
    messages.forEach( ({ name, message }) => {

        messagesHTML += `
            <li>
                <p>
                    <span class="text-primary">${ name }</span>
                    <span>${ message }</span>
                </p>
            </li>

        `;

    });

    ulMessage.innerHTML = messagesHTML;

}


txtMessage.addEventListener('keyup', ({ keyCode }) => {

    const message = txtMessage.value;
    const uid = txtUid.value;

    if(keyCode !== 13) { return; }

    if( message.length === 0) { return; }

    socket.emit('send-message', { message, uid });

    txtMessage.value = '';

});


const main = async() => {
    
    await validateJWT();


}


main();
