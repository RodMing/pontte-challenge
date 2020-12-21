"use strict";

module.exports = async ({ queryStringParameters, sequelize, logger }, context, callback) => {
    const { force } = queryStringParameters;

    await sequelize.sync({
        force: Boolean(force) || false
    });

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({})
    });
};