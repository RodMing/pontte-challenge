"use strict";

module.exports = ({ Contract }, logger) => ({
    create: async (data, transaction) => {
        const newContract = await Contract.create(data, transaction);

        logger({
            param: data,
            result: newContract
        });

        return newContract;
    }
});
