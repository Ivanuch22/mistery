const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]//bearer asaa;sldkfj
        if (!token) {
            res.status(401).json({ message: "Не авторизований" })
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decode
        next()
    } catch (e) {
        res.status(401).json({ message: "Не авторизований" })
    }
}