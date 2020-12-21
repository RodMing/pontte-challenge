module.exports = sequelize => {
    const models = {
        Contract: require("./contract")(sequelize),
        ContractImage: require("./contractImage")(sequelize),
    };

    Object.keys(models).forEach(
        modelName => {
            if ("associate" in models[modelName]) {
                models[modelName].associate(models);
            }
        }
    );

    return models;
};
