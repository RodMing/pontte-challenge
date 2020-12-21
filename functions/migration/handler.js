"use strict";

const middy = require("middy");
const { doNotWaitForEmptyEventLoop } = require("middy/middlewares");
const sequelize = require("../../common/sequelize")();
const services = require("../../common/middlewares/service")(sequelize);
const logger = require("../../common/middlewares/logger");
const serverError = require("../../common/middlewares/serverError");
const transaction = require("../../common/middlewares/transaction")(sequelize);
const transactionError = require("../../common/middlewares/transactionError");

module.exports = {
    get: middy(require("./migrate"))
        .before(transaction)
        .before(logger)
        .before(services)
        .before((handler, next) => {
            handler.event.sequelize = sequelize;
            next();
        })
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .onError(transactionError)
        .onError(serverError)
};