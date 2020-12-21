"use strict";

module.exports = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 1 },
        email: { type: "string", format: "email" },
        cpf: { type: "string", pattern: "^[0-9]{11}$" },
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
