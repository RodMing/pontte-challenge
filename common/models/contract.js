"use strict";

const { Model, Sequelize } = require("sequelize");

module.exports = sequelize => {
    class Contract extends Model {}

    Contract.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: Sequelize.STRING,
                allowNull: false
            },
            amount: {
                type: Sequelize.NUMBER,
                allowNull: false
            },
            income: {
                type: Sequelize.NUMBER,
                allowNull: true
            },
            birthdate: {
                type: Sequelize.DATEONLY,
                allowNull: true
            },
            maritalStatus: {
                type: Sequelize.STRING,
                allowNull: true
            },
            address: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: "created_at"
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                field: "updated_at"
            }
        },
        {
            sequelize,
            modelName: "contract",
            tableName: "contracts",
            timestamps: true,
            underscored: true,
            undescoredAll: true,
        }
    );

    Contract.associate = models => {};

    /* 
        Retorna somente as propriedades públicas 
    */
    Contract.prototype.public = () => ({
        id: this.id,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    });

    return Contract;
};
