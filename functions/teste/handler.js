"use strict";

const middy = require("middy");
const { doNotWaitForEmptyEventLoop } = require("middy/middlewares");
const sequelize = require("../../common/sequelize")();
const services = require("../../common/middlewares/service")(sequelize);

module.exports.get = middy(require("./teste"))
.use(doNotWaitForEmptyEventLoop({ runOnError: true }));