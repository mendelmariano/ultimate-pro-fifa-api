module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgresql',
    database: process.env.DB_DATABASE || 'ultimateprofifa',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false, // very important
        },
    },
};
