const ApiError = require('../error/ApiError')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const { User, Basket } = require("../models/models");

const generateJWT = (id, email, role) => {
    const token = jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    )
    return { token }
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return newx(ApiError.badRequest("Некоректний email або пароль"));
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest("Користувач з таким email уже створений"))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })

        return res.json(generateJWT(user.id, user.email, user.role))
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal("Користувач не знайдений"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Пароль не вірний"))
        }
        return res.json(generateJWT(user.id, user.email, user.role));
    }
    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json(token)

    }

}
module.exports = new UserController();