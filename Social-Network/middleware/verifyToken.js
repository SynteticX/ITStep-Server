const SECRET_KEY = "secret-token";

// Функция для авторизации пользователя по ключу
function verifyToken(req, res, next) {

    // Токен который прислал клиент
    const token = req.headers['authorization'];

    // Проверяем был ли прислан токен
    if (!token) {
        return res.status(403).json({error: "Вы не авторизованы!"});
    }

    // Проверяем токен
    if (token !== SECRET_KEY) {
        return res.status(403).json({error: "Токен не верный!"});
    }

    next();
}

module.exports = verifyToken;