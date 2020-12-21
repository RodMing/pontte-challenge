"use strict";

module.exports = ({ Contract }) => ({
  create: (data, transaction) => Contract.create(data, { transaction }),
  getById: id => Contract.findOne({
    where: { id }
  })
});
