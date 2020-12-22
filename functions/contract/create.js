"use strict";

module.exports = async ({ body, transaction, services, logger }, context, callback) => {
    const { contractService } = services;

    const contract = await contractService().create(body, transaction);

    await transaction.commit();

    return callback(null, {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(contract)
    });
};