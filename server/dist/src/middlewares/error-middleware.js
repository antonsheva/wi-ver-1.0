// const ApiError = require('../exceptions/api-error')
module.exports = (err, req, res, next) => {
    console.log(err);
    if (err) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }
    return res.stat(500).json({ message: 'Ошибка сервера' });
};
//# sourceMappingURL=error-middleware.js.map