import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import databaseConfigProd from '../config/database_prod';
import User from '../app/models/User';
import Team from '../app/models/Team';
import Profile from '../app/models/Profile';
import Championship from '../app/models/Championship';
import Classification from '../app/models/Classification';
import Result from '../app/models/Result';
import Mode from '../app/models/Mode';

const models = [
    Profile,
    User,
    Team,
    Championship,
    Classification,
    Result,
    Mode,
];

class Database {
    constructor() {
        this.init();
    }

    init() {
        /* this.connection = new Sequelize(
            `${process.env.DATABASE_URL}?sslmode=require`,
            {
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        rejectUnauthorized: false, // very important
                    },
                },
            }
        ); */

        this.connection = new Sequelize(databaseConfigProd);

        /* this.connection = new Sequelize(databaseConfig); */

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
