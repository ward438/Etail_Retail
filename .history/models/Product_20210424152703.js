// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
        // validate value is decimal input
    },
    stock: {
        type: DataTypes.INTEGER(200),
        DEFAULT: 10,
        allowNull: false,
        // validate value is numeric

    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
});

module.exports = Product;