// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Team from '../app/models/Team';
import Profile from '../app/models/Profile';
import Championship from '../app/models/Championship';
import Classification from '../app/models/Classification';
import Result from '../app/models/Result';

const models = [Profile, User, Team, Championship, Classification, Result];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }
}

export default new Database();
