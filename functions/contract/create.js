"use strict";

module.exports = async ({ services, logger }, context, callback) => {
    console.log(services, logger);

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({name: "Rodrigo"})
    });
};