"use strict";

module.exports = (sequelize, dynamoDB) => (handler, next) => {
    const logger = handler.event.logger || {
        info: log => console.info(JSON.stringify(log, null, 2))
    };
    handler.event.services = require("../services/index")(sequelize, logger, dynamoDB);
    next();
};
