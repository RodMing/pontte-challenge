"use strict";

const logger = require("../utils/logger");

module.exports = (handler, next) => {
    handler.event.logger = logger(handler);
    next();
};
