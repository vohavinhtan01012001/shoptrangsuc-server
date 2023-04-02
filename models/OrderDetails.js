module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define("OrderDetails", {
        orderDetailID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        orderID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    });
    return OrderDetail;
}