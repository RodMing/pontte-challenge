"use strict";

module.exports = async ({ body, transaction, services, logger }, context, callback) => {
    const { contractService } = services;

    const id = await contractService().create(body, transaction).then(r => r.id);

    await transaction.commit();

    const contract = await contractService().getById(id);

    return callback(null, {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(contract)
    });
};