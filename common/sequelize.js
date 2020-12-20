"use strict";

const Sequelize = require("sequelize");
const pg = require("pg");
delete pg.native;

module.exports = () => {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      dialect: process.env.DB_DIALECT || 'postgres',
      dialectOptions: {
        connectTimeout: 60000,
        pool: {
            min: 0,
            max: 1,
            idle: 1000,
            evict: 1000
        }
      },
      dialectModule: pg,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      
    }
  );
  sequelize.authenticate();

  return sequelize;
};
