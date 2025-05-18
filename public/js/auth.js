
const myForm = document.querySelector('form');
const url = 'http://localhost:8080/api/auth/';



myForm.addEventListener('submit', ev => {
    ev.preventDefault();

    const formData = {};

    for( let el of myForm.elements ){
        if(el.namespaceURI.length > 0){
            formData[el.name] = el.value;
        }
    }

    console.log(formData);

    fetch(url + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then( resp => resp.json() )
    .then( ({ msg, token}) => {
        if(msg){
            return console.error(msg);
        }
        console.log(token);
        localStorage.setItem('token', token);
    })
    .catch( console.warn );

})



function handleCredentialResponse(response) {

    //console.log('id_token', response.credential);

    const body = { id_token: response.credential };

    fetch(url , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then( resp => resp.json() )
    .then( resp => {
        //console.log(resp);
        console.log(resp.token);
        localStorage.setItem('token', resp.token);
    })
    .catch( console.warn );
}

const button = document.getElementById('google_signout');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke( localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    })
}

