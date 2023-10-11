import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

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
        this.connection = new Sequelize(
            `${process.env.DATABASE_URI}?sslmode=require` || databaseConfig,
            {
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        rejectUnauthorized: false, // very important
                    },
                },
                // Use a different storage. Default: none
                seederStorage: 'json',
                // Use a different file name. Default: sequelize-data.json
                seederStoragePath: 'sequelizeData.json',
                // Use a different table name. Default: SequelizeData
                seederStorageTableName: 'sequelize_data',
            }
        );

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
