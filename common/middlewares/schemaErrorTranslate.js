"use strict";

const errorResponse = require("../utils/errorResponse");

module.exports = dict => (handler, next) => {
  if (handler.error.message !== "Event object failed validation") {
    return next();
  }
  const i18n = require("../utils/i18n")(dict);
  handler.response = errorResponse(
    400,
    handler.error.details.map(error =>
      i18n[error.keyword] ? i18n[error.keyword](error) : error.message
    )
  );
  return next();
};
