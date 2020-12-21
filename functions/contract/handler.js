"use strict";

const middy = require("middy");
const { doNotWaitForEmptyEventLoop, validator } = require("middy/middlewares");
const sequelize = require("../../common/sequelize")();
const services = require("../../common/middlewares/service")(sequelize);
const jsonBodyParser = require("../../common/middlewares/json-body-parser");
const schemaError = require("../../common/middlewares/schemaErrorTranslate")(
    require("./utils/dictTranslate")
);
const logger = require("../../common/middlewares/logger");
const serverError = require("../../common/middlewares/serverError");

module.exports = {
    post: middy(require("./create"))
        .before(jsonBodyParser())
        .before(logger)
        .before(services)
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .use(validator({ inputSchema: require("./schema/create") }))
        .onError(schemaError)
        .onError(serverError())
};