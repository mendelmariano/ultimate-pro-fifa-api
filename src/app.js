import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import routes from './routes';

// Importando nossa database
import './database';

/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/order
import * as dotenv from 'dotenv';

dotenv.config();

const corsOptions = {
    origin: 'https://ultimate-clubs-estatico-lmm6yynxb-mendelmarianos-projects.vercel.app, localhost', // Substitua pela origem que você deseja permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors(corsOptions));
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
