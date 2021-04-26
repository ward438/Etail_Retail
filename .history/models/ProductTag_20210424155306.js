const { Model, DataTypes } = require('sequelize');
const { Product } = require('Product')

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        REFERENCES: product.id
    },
    tag_id: {
        type: DataTypes.INTEGER,
        REFERENCES: model.id,
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
});

module.exports = ProductTag;