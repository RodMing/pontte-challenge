"use strict";

module.exports = sequelize => (handler, next) => {
    sequelize.transaction().then(transaction => {
        handler.event.transaction = transaction;
        next();
    });
};
