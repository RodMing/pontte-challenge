"use strict";

module.exports = async ({ pathParameters, services, logger }, context, callback) => {
    const { id } = pathParameters;
    const { contractService } = services;

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ teste: 'OK' })
    });
};