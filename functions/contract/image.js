"use strict";

module.exports = async ({ body, pathParameters, queryStringParameters, transaction, services, logger }, context, callback) => {
    const { contractService, s3Service } = services;
    const { id: contractId } = pathParameters;
    const { type } = queryStringParameters;

    const uri = await s3Service().upload({
        bucket: 'pontte-mingattos',
        key: `${type}_${contractId}_${new Date().getTime()}`,
        file: body
    });

    const image = await contractService().sendImage({
        type,
        contractId,
        uri
    }, transaction);

    await transaction.commit();

    const contract = await contractService().getById(contractId);

    return callback(null, {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(image)
    });
};