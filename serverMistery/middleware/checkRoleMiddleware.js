const jwt = require("jsonwebtoken")


module.exports = (role) => {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(" ")[1]//bearer asaa;sldkfj
            if (!token) {
                res.status(401).json({ message: "Не авторизований" })
            }
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            if (decode.role != role) {
                return res.status(403).json({ message: "нет доступа" })
            }

            req.user = decode
            next()

        } catch (e) {
            res.status(401).json({ message: "Не авторизований" })
        }
    }
}

