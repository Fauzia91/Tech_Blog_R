const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
if(process.env.CLEARDB_DATABASE_URL){
    sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL,{
        host: 'localhost',
        dialect: 'mysql2',
        port: 3306,
    });
} else if(process.env.DB_HOST){

    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            port: 3306,
        }
    );

} else if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
        }
    );
}



module.exports = sequelize;
