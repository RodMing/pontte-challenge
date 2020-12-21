"use strict";

module.exports = async ({ transaction, sequelize, logger }, context, callback) => {
    await sequelize.sync();
    await transaction.commit();

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({})
    });
};