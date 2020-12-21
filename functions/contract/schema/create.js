"use strict";

module.exports = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        email: { type: "string", format: "email" },
        cpf: { type: "string", regex: "^[0-9]{11}$" },
        amount: { type: "number", exclusiveMinimum: 0 }
      },
      required: [
          "name",
          "email",
          "cpf",
          "amount"
      ]
    }
  },
  required: [
    "body"
  ]
};
