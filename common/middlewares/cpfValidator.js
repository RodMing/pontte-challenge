"use strict";

const errorResponse = require("../utils/errorResponse");
const { cpf: cpfValidator } = require("cpf-cnpj-validator");

module.exports = {
    before: ({ event }, next) => {
        const { cpf } = event.body;

        if (cpf && !cpfValidator.isValid(cpf)) {
            throw Error('invalidCPF');
        }
    
        next();
    },
    onError: (handler, next) => {
        const logger = handler.event.logger || require("../utils/logger");

        logger.info({
            msg: "invalidCPF",
            error: handler.error
        })

        if (handler.response) {
            return next();
        }

        handler.response = errorResponse(400, {
            message: "Campo 'CPF' não possui um valor válido",
            path: "cpf"
        });

        return next();
    }
}