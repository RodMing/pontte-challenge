"use strict";

module.exports = ({ Contract, ContractImage }) => ({
  create: (data, transaction) => Contract.create(data, { transaction }),
  getById: id => Contract.findOne({
    where: { id },
    include: [{
      model: ContractImage,
      as: 'images'
    }]
  })
});
