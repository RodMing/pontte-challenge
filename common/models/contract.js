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
                type: Sequelize.FLOAT,
                allowNull: false
            },
            income: {
                type: Sequelize.FLOAT,
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
    Contract.prototype.public = function () {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            cpf: this.cpf,
            amount: this.amount,
            income: this.income,
            birthdate: this.birthdate,
            maritalStatus: this.maritalStatus,
            address: this.address,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    };

    return Contract;
};
