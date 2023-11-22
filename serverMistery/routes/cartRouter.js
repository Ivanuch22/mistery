const Router = require("express");
const CartController = require("../controllers/cartController")
const router = new Router();

router.post("/", CartController.create)
router.get("/", CartController.getAll)
router.get("/:id", CartController.getOne)
router.delete("/:id", CartController.deleteOne);

module.exports = router;