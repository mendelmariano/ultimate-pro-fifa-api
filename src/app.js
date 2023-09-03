import express from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import routes from './routes';

// Importando nossa database
import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
