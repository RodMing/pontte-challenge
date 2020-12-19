"use strict";

const middy = require("middy");
const { doNotWaitForEmptyEventLoop } = require("middy/middlewares");

module.exports.get = middy(require("./teste"))
.use(doNotWaitForEmptyEventLoop({ runOnError: true }));