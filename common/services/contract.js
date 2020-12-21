"use strict";

module.exports = ({ Contract }, logger) => ({
    create: async (data, transaction) => {
        const newContract = await Contract.create(data, transaction);

        logger.info({
            param: data,
            result: newContract
        });

        return newContract;
    }
});
