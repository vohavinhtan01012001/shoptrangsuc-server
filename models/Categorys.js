module.exports = (sequelize, DataTypes) => {
    const Categorys = sequelize.define("Categorys", {
        categoryID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
/*     Categorys.associate = (models) => {
        Categorys.hasMany(models.Products, {
            onDelete: "cascade"
        });
    } */
    return Categorys;
}