"use strict";

module.exports = async (event, context, callback) => {
    console.log(event);

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({name: "Rodrigo"})
    });
};