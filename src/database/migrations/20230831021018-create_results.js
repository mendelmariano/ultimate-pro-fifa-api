/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('results', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            home_team: {
                type: Sequelize.INTEGER,
                references: { model: 'teams', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            away_team: {
                type: Sequelize.INTEGER,
                references: { model: 'teams', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            championship_id: {
                type: Sequelize.INTEGER,
                references: { model: 'championships', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: false,
            },
            home_goals: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            away_goals: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            check: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('results');
    },
};
