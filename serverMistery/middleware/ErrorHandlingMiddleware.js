const ApiError = require("../error/ApiError");

module.exports = function (err, req, res, next) {
    // Перевірка, чи вже відправлено відповідь
    if (res.headersSent) {
        return next(err);
    }

    // Відправлення відповіді на основі типу помилки
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message });
    } else {
        return res.status(500).json({ message: "Непередбачувана помилка" });
    }
};