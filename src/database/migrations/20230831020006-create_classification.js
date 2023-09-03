/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('classifications', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            points: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            goals_pro: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            goals_conceded: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            goals_difference: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            wins: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            loses: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            ties: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 0,
            },
            check: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            team_id: {
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
        await queryInterface.dropTable('classifications');
    },
};
