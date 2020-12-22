"use strict";

module.exports = ({ Contract, ContractImage }, logger) => ({
    create: async (data, transaction) => {
        delete data.status;
        const newContract = await Contract.create(data, transaction);

        logger.info({
            param: data,
            result: newContract
        });

        return newContract;
    },
    getById: async id => {
        const contract = await Contract.getById(id).then(r => r ? r.public() : null);

        logger.info({
            param: { id },
            result: contract
        });

        return contract;
    },
    sendImage: async (data, transaction) => {
        const image = await ContractImage.create(data, transaction);

        logger.info({
            param: data,
            result: image
        });

        return image;
    },
    updateById: async (id, data, transaction) => {
        const contract = await Contract.updateById(id, data, transaction);

        logger.info({
            param: { id, data },
            result: contract
        });

        return contract;
    },
    approval: async (id, status, transaction) => {
        const contract = await Contract.approval(id, status, transaction);

        logger.info({
            param: { id, status },
            result: contract
        });

        return contract;
    }
});
