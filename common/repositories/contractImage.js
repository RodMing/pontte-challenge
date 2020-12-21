"use strict";

module.exports = ({ ContractImage }) => ({
  create: (data, transaction) => ContractImage.create(data, { transaction })
});
