import express, { Application } from 'express';
import userRoutes from '../routes/users';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // TODO: Conexión a Base de Datos
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online...')
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {
        // Configuracion inicial de CORS
        this.app.use(cors());

        // Lectura de body JSON
        this.app.use(express.json());

        // Habilitar visualizacion de carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;