// basketRouter.js
const Router = require("express");
const BasketController = require("../controllers/basketController");
const authMiddleware = require("../middleware/authMiddleware");
const router = new Router();

router.post("/add", authMiddleware, BasketController.addToBasket);
router.delete("/:cartId", authMiddleware, BasketController.removeFromBasket);
router.get("/", authMiddleware, BasketController.getBasket);

module.exports = router;
