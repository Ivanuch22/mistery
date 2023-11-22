// basketController.js
const { Basket, Cart } = require("../models/models");
const ApiError = require("../error/ApiError");

class BasketController {
    async addToBasket(req, res, next) {
        try {
            const { cartId } = req.body;

            // Check if the cart with the specified ID exists
            const cart = await Cart.findOne({ where: { id: cartId } });
            if (!cart) {
                return next(ApiError.badRequest(`Cart with id ${cartId} not found`));
            }

            // Add the cart to the user's basket
            // Assuming you have a user authentication system, you can get the user ID from the request
            const userId = req.user.id; // Adjust this according to your authentication system

            let basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                basket = await Basket.create({ userId });
            }

            await basket.addCart(cart);

            return res.json({ message: `Cart added to the basket successfully` });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async removeFromBasket(req, res, next) {
        try {
            const { cartId } = req.params;

            // Assuming you have a user authentication system, you can get the user ID from the request
            const userId = req.user.id; // Adjust this according to your authentication system

            // Check if the cart is in the user's basket
            const basket = await Basket.findOne({
                where: { userId },
                include: [{ model: Cart, as: "carts", where: { id: cartId } }],
            });

            if (!basket) {
                return next(ApiError.badRequest(`Cart with id ${cartId} not found in the basket`));
            }

            // Remove the cart from the user's basket
            await basket.removeCart(cartId);

            return res.json({ message: `Cart removed from the basket successfully` });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getBasket(req, res, next) {
        try {
            // Assuming you have a user authentication system, you can get the user ID from the request
            const userId = req.user.id; // Adjust this according to your authentication system

            // Get the user's basket with associated carts
            const basket = await Basket.findOne({
                where: { userId },
                include: [{ model: Cart, as: "carts" }],
            });

            if (!basket) {
                return next(ApiError.badRequest("Basket not found for the user"));
            }

            return res.json(basket);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BasketController();
