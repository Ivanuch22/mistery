const uuid = require("uuid");
const path = require("path");
const { Cart, CartInfo } = require("../models/models");
const ApiError = require("../error/ApiError");


class CartController {
    async create(req, res, next) {
        try {
            const { name, price, oldPrice, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));

            const cart = await Cart.create({ name, price, oldPrice, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(element => {
                    CartInfo.create({
                        text: element.text,
                        title: element.title,
                        description: element.description,
                        cartId: cart.id
                    })
                });
            }

            return res.json(cart)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async deleteOne(req, res, next) {
        try {
            const { id } = req.params;

            // Check if the cart with the given id exists
            const cart = await Cart.findOne({ where: { id } });
            if (!cart) {
                return next(ApiError.badRequest(`Cart with id ${id} not found`));
            }

            // Delete the cart
            await Cart.destroy({ where: { id } });

            return res.json({ message: `Cart with id ${id} deleted successfully` });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { typeId, limit, page } = req.query;
        page = page || 1
        limit = limit || 8
        let cart;

        let offset = page * limit - limit;
        if (typeId) {
            cart = await Cart.findAndCountAll({ where: { typeId }, limit, offset })
            return res.json(cart);
        }
        if (!typeId) {
            cart = await Cart.findAndCountAll({ limit, offset })
            return res.json(cart);
        }

    }
    async getOne(req, res) {
        const { id } = req.params;
        const cart = await Cart.findAll({
            where: { id },
            include: [{ model: CartInfo, as: "info" }]
        })
        return res.json(cart)
    }

}

module.exports = new CartController()