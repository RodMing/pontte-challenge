"use strict";

const middy = require("middy");
const { doNotWaitForEmptyEventLoop, validator } = require("middy/middlewares");
const httpMultipartBodyParser = require('@middy/http-multipart-body-parser');
const sequelize = require("../../common/sequelize")();
const services = require("../../common/middlewares/service")(sequelize);
const jsonBodyParser = require("../../common/middlewares/json-body-parser");
const schemaError = require("../../common/middlewares/schemaErrorTranslate")(
    require("./utils/dictTranslate")
);
const logger = require("../../common/middlewares/logger");
const serverError = require("../../common/middlewares/serverError");
const transaction = require("../../common/middlewares/transaction")(sequelize);
const transactionError = require("../../common/middlewares/transactionError");
const cpfValidator = require("../../common/middlewares/cpfValidator");
const databaseError = require("./middlewares/databaseError");
const allowedFields = require("./middlewares/allowedFields");
const allowUpload = require("./middlewares/allowUpload");
const allowApproval = require("./middlewares/allowApproval");
const allowUpdate = require("./middlewares/allowUpdate");

module.exports = {
    post: middy(require("./create"))
        .before(jsonBodyParser())
        .before(transaction)
        .before(logger)
        .before(services)
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .use(validator({ inputSchema: require("./schema/create") }))
        .use(cpfValidator)
        .onError(schemaError)
        .onError(transactionError)
        .onError(serverError),
    get: middy(require("./get"))
        .before(logger)
        .before(services)
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .onError(serverError),
    sendImage: middy(require("./image"))
        .before(transaction)
        .before(logger)
        .before(services)
        .use(allowUpload)
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .use(httpMultipartBodyParser())
        .onError(transactionError)
        .onError(databaseError)
        .onError(serverError),
    update: middy(require("./patch"))
        .before(jsonBodyParser())
        .before(transaction)
        .before(logger)
        .before(services)
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .use(allowUpdate)
        .use(validator({ inputSchema: require("./schema/update") }))
        .use(cpfValidator)
        .use(allowedFields)
        .onError(schemaError)
        .onError(transactionError)
        .onError(serverError),
    approval: middy(require("./approval"))
        .before(jsonBodyParser())
        .before(transaction)
        .before(logger)
        .before(services)
        .use(doNotWaitForEmptyEventLoop({ runOnError: true }))
        .use(allowApproval)
        .use(validator({ inputSchema: require("./schema/approval") }))
        .onError(schemaError)
        .onError(transactionError)
        .onError(serverError),
};