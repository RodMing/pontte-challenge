"use strict";

module.exports = ({ Contract, ContractImage }) => ({
  create: (data, transaction) => Contract.create(data, { transaction }),
  getById: id => Contract.findOne({
    where: { id },
    include: [{
      model: ContractImage,
      as: 'images'
    }]
  }),
  updateById: (id, data, transaction) => Contract.update(
    data,
    {
      transaction,
      returning: true,
      where: { id },
    }
  ),
  approval: (id, status, transaction) => Contract.update({
    status
  }, {
    transaction,
    returning: true,
    where: { id }
  })
});
