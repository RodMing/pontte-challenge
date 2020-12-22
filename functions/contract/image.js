"use strict";

module.exports = async ({ body, pathParameters, transaction, services, logger }, context, callback) => {
    const { contractService, s3Service } = services;
    const { id: contractId } = pathParameters;

    await Promise.all(Object.keys(body).map(async type => {
        const uri = await s3Service().upload({
            bucket: 'teste',
            key: 'oi',
            file: body[type]
        });

        return contractService().sendImage({
            type,
            contractId,
            uri
        }, transaction);
    }));

    await transaction.commit();

    const contract = await contractService().getById(contractId);

    return callback(null, {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(contract)
    });
};