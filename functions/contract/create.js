"use strict";

module.exports = async ({ transaction, services, logger }, context, callback) => {
    console.log(services, logger);

    await transaction.commit();

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({name: "Rodrigo"})
    });
};