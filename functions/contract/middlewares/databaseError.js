"use strict";
const errorResponse = require("../../../common/utils/errorResponse");

const errors = [
    {
        constraint: 'contract-images_contract_id_type',
        response: errorResponse(409, {
            message: "O contrato já possui esse tipo de documento",
            path: "type",
        })
    }
];

module.exports = (handler, next) => {
    if (handler.response) {
        return next();
    }

    const error = errors.find(e => e.constraint == handler.error.original.constraint);

    if (error) {
        handler.response = error.response;

        return next();
    }

    return next();
};
