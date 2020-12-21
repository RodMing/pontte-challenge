"use strict";

const { Model, Sequelize } = require("sequelize");

module.exports = sequelize => {
    class ContractImage extends Model {}

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
        }
    );

    ContractImage.associate = models => {
        ContractImage.belongsTo(models.Contract, {
            foreignKey: "contractId",
            as: "contract",
        });
    };

    /* 
        Retorna somente as propriedades públicas 
    */
    ContractImage.prototype.public = function () {
        return {
            id: this.id,
            contractId: this.contractId,
            uri: this.uri,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    };

    return ContractImage;
};
