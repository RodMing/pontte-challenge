"use strict";

const errorResponse = require("../../../common/utils/errorResponse");

module.exports = {
    before: ({ event }, next) => new Promise((resolve, reject) => {
        const { pathParameters, services } = event;
        const { contractService } = services;
        const { id } = pathParameters;

        contractService().getById(id).then(contract => {
            if (!contract) {
                reject('not_found')
            } else if (contract.status !== null) {
                reject('finished');
            } else {
                resolve();
            }
        });
    }),
    onError: (handler, next) => {
        if (handler.error === 'finished') {
            handler.response = errorResponse(406, {
                code: "Contrato finalizado"
            });
        } else if (handler.error === 'not_found') {
            handler.response = errorResponse(404, null);
        }
        next();
    }
}