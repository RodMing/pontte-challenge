"use strict";

module.exports = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        status: { type: "string", enum: ["approved", "disapproved"] }
      },
      required: [
          "status"
      ]
    }
  },
  required: [
    "body"
  ]
};
