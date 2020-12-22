"use strict";

const errorResponse = require("../../../common/utils/errorResponse");

module.exports = {
    before: ({ event }, next) => new Promise((resolve, reject) => {
        const { pathParameters, services } = event;
        const { contractService } = services;
        const { id } = pathParameters;

        contractService().getById(id).then(contract => {
            if (contract.state != 'upload') {
                reject('invalid_state');
            } else {
                resolve();
            }
        });
    }),
    onError: (handler, next) => {
        if (handler.error === 'invalid_state') {
            handler.response = errorResponse(406, {
                code: "Estado anterior incompleto"
            });
        }
        next();
    }
}