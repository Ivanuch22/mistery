const sequelize = require("../db");
const { DataTypes } = require('sequelize');


const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" }
})

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const BasketCart = sequelize.define("basket_cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Cart = sequelize.define("cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    oldPrice: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    isLike: { type: DataTypes.BOOLEAN, defaultValue: false },
    isAdd: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const CartInfo = sequelize.define("cart_info", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define("type", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

User.hasOne(Basket)
Basket.belongsTo(User)

Cart.hasMany(BasketCart)
BasketCart.belongsTo(Cart)

Cart.hasMany(CartInfo, { as: "info" })
CartInfo.belongsTo(Cart)

Basket.hasMany(BasketCart)
BasketCart.belongsTo(Basket)

Type.hasMany(Cart)
Cart.belongsTo(Type)


Basket.belongsTo(User); // Add this line to establish the association with User
Basket.belongsToMany(Cart, { through: "basket_cart" });

Cart.belongsToMany(Basket, { through: "basket_cart" }); // Add this line to associate with Basket

BasketCart.belongsTo(Basket);
BasketCart.belongsTo(Cart);

module.exports = {
    User,
    Basket,
    BasketCart,
    Cart,
    Type,
    CartInfo
}
