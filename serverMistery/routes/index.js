const Router = require("express");
const router = new Router();
const cartRouter = require("./cartRouter")
const userRouter = require("./userRouter")
const typeRouter = require("./typeRouter")
const basketRouter = require("./basketRouter");


router.use("/user", userRouter)
router.use("/type", typeRouter)
router.use("/cart", cartRouter)
router.use("/basket", basketRouter)

module.exports = router;