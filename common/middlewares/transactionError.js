module.exports = ({ event }, next) => {
    if (event.transaction && event.transaction.finished !== "commit") {
        event.transaction.rollback();
    }
    next();
};
