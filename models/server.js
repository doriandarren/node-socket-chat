import express from 'express';
import usersRoutes from '../routes/users.js';
import authRoutes from '../routes/auth.js';
import categoriesRoutes from '../routes/categories.js';
import productsRoutes from '../routes/products.js';
import seachesRoutes from '../routes/searches.js';
import uploadsRoutes from '../routes/uploads.js';
import cors from 'cors';
import { dbConnection } from '../database/config.js';
import fileUpload from 'express-fileupload';
import { Server } from "socket.io";
import { createServer } from 'http';
import { socketController } from '../sockets/controller.socket.js';



export class MyServer {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = createServer( this.app );
        this.io = new Server(this.server, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            }
        });


        this.paths = {
            auth:       '/api/auth',
            users:      '/api/users',
            categories: '/api/categories',
            products:   '/api/products',
            seaches:   '/api/searches',
            uploads:   '/api/uploads',
        }

        // Conectar a DB
        this.conectarDB();

        //Middlewares
        this.middlewares();


        //Rutas de mi aplicación 
        this.routes();

        // 
        this.sockets();
    }

    async conectarDB() {
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors());

        // Lectura de parse del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use( express.static('public') );


        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true,
        }));

    }

    routes() {
        
        this.app.use(this.paths.auth, authRoutes);

        this.app.use(this.paths.users, usersRoutes);

        this.app.use(this.paths.categories, categoriesRoutes);

        this.app.use(this.paths.products, productsRoutes);

        this.app.use(this.paths.seaches, seachesRoutes);

        this.app.use(this.paths.uploads, uploadsRoutes);

    }
    

    sockets(){
        this.io.on('connection', socketController );
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto, ${this.port}`);
        });
    }
}