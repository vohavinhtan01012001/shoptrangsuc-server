module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        productID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img3: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img4: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Products;
}