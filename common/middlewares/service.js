"use strict";

module.exports = sequelize => (handler, next) => {
    const logger = handler.event.logger || require("../utils/logger");
    handler.event.services = require("../services/index")(sequelize, logger);
    next();
};
