module.exports = {
    dialect: 'postgres',
    port: process.env.DB_PORT || '5432',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgresql',
    database: process.env.DB_DATABASE || 'ultimateprofifa',
    dialectOptions: {
        ssl: {
            ssl: true,
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false, // This line will fix new error
        },
    },
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
