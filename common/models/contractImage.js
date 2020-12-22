"use strict";

const { Model, Sequelize } = require("sequelize");

module.exports = sequelize => {
    class ContractImage extends Model {
        public() {
            return {
                id: this.id,
                contractId: this.contractId,
                type: this.type,
                uri: this.uri,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt,
            };
        }
    }

    ContractImage.init(
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            contractId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM('cnh', 'cpf', 'income', 'property'),
                allowNull: false
            },
            uri: {
                type: Sequelize.STRING,
                allowNull: false
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
            modelName: "contract-image",
            tableName: "contract-images",
            timestamps: true,
            underscored: true,
            undescoredAll: true,
            indexes: [{ unique: true, fields: ['contract_id', 'type'] }]
        }
    );

    ContractImage.associate = models => {
        ContractImage.belongsTo(models.Contract, {
            foreignKey: "contractId",
            as: "contract",
        });
    };

    return ContractImage;
};
