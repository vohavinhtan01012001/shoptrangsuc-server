module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("Users", {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    });
    return User;
}