/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        await queryInterface.bulkInsert(
            'profiles',
            [
                {
                    id: 0,
                    name: 'Registred',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    id: 1,
                    name: 'Administrator',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('profiles', null, {});
    },
};
