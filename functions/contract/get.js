"use strict";

module.exports = async ({ pathParameters, services, logger }, context, callback) => {
    const { id } = pathParameters;
    const { contractService } = services;

    const contract = await contractService().getById(id);

    return callback(null, {
        statusCode: contract ? 200 : 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(contract)
    });
};