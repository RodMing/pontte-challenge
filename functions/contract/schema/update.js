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
        amount: { type: "number", exclusiveMinimum: 0 },
        income: { type: "number", exclusiveMinimum: 0 },
        birthdate: { type: "string", format: "date" },
        maritalStatus: { type: "string", minLength: 1 },
        address: { type: "string", minLength: 1 },
        status: { type: "string", enum: ["approved", "disapproved"] }
      }
    }
  },
  required: [
    "body"
  ]
};
