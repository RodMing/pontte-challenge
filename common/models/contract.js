"use strict";

const { Model, Sequelize } = require("sequelize");

module.exports = sequelize => {
    class Contract extends Model {
        public() {
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
                status: this.status,
                images: this.images ? this.images.map(i => i.public()) : [],
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
            };
        }
    }

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
            status: {
                type: Sequelize.ENUM('approved', 'disapproved'),
                allowNull: true,
                defaultValue: null
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

    Contract.associate = models => {
        Contract.hasMany(models.ContractImage, {
            foreignKey: "contractId",
            as: "images",
        });
    };

    return Contract;
};
