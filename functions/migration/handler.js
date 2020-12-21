"use strict";

const middy = require("middy");
const { doNotWaitForEmptyEventLoop, httpEventNormalizer } = require("middy/middlewares");
const sequelize = require("../../common/sequelize")();
const services = require("../../common/middlewares/service")(sequelize);
const logger = require("../../common/middlewares/logger");
const serverError = require("../../common/middlewares/serverError");

module.exports = {
    get: middy(require("./migrate"))
        .before(logger)
        .before(services)
        .before((handler, next) => {
            handler.event.sequelize = sequelize;
            next();
        })
        .use(httpEventNormalizer())
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .onError(serverError)
};