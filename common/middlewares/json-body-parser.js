"use strict";

const createError = require("http-errors");
const contentType = require("content-type");

function hasContentType(headers) {
  if (!headers) {
    return;
  }
  let contentTypeRight;
  Object.keys(headers).map(key => {
    if (key === "content-type") {
      contentTypeRight = "content-type";
    }
    if (key === "Content-Type") {
      contentTypeRight = "Content-Type";
    }
  });
  return contentTypeRight;
}

module.exports = () => (handler, next) => {
  if (!handler.event.headers) {
    next();
  }

  const content = hasContentType(handler.event.headers);
  if (!content) {
    next();
  }

  const { type } = contentType.parse(handler.event.headers[content]);
  if (["application/x-amz-json-1.1", "application/json"].includes(type)) {
    try {
      handler.event.body = JSON.parse(handler.event.body);
    } catch (err) {
      throw new createError.UnprocessableEntity(
        "Content type defined as JSON but an invalid JSON was provided"
      );
    }
  }
  next();
};
