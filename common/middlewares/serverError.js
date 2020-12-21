"use strict";

const errorResponse = require("../utils/errorResponse");

module.exports = (handler, next) => {
    const logger = handler.event.logger || require("../utils/logger");

    logger.info({
        msg: "Erro interno do servidor",
        error: handler.error
    })

    if (handler.response) {
        return next();
    }

    handler.response = errorResponse(500, {
        message: "Erro interno do servidor",
        path: "null"
    });

    return next();
};
