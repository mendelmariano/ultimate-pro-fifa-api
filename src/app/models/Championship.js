// eslint-disable-next-line import/no-extraneous-dependencies
import Sequelize, { Model } from 'sequelize';

class Championship extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                active: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                timestamps: true,
            }
        );
        return this;
    }
}

export default Championship;
