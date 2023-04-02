module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Carts", {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    
    Cart.associate = (models) => {
        Cart.belongsTo(models.Products, {
            onDelete: "cascade",
            foreignKey: 'ProductId' 
        });
    }
    return Cart;
}