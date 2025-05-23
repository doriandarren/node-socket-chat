class Message{

    constructor(uid, name, message){
        this.uid = uid;
        this.name = name;
        this.message = message;
    }
}



export class ChatMessages{

    constructor(){
        this.messages = [];
        this.users = {};
    }

    get last10(){
        this.messages = this.messages.splice(0, 10);
        return this.messages;
    }

    get usersArr(){
        return Object.values( this.users ); // [ {}, {}, {} ]
    }

    sentMessage( uid, name, message ){
        this.messages.unshift(
            new Message(uid, name, message)
        );
    }

    connectUser(user){
        this.users[user.id] = user;
    }

    disconnectUser(id){
        delete this.users[id];
    }

}