"use strict";

module.exports = async ({ body, pathParameters, transaction, services }, context, callback) => {
    const { contractService } = services;
    const { id } = pathParameters;

    await contractService().approval(id, body.status, transaction);

    await transaction.commit();

    const contract = await contractService().getById(id);

    return callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(contract)
    });
};