const jwt = require('jsonwebtoken'); // Библиотека JWT токенов
const SECRET_KEY = (process.env.SECRET_KEY) ? process.env.SECRET_KEY : "jkhdfbg6fdgdsg";

// Функция для авторизации пользователя по ключу
function verifyToken(req, res, next) {

    // Токен который прислал клиент
    const token = req.headers['authorization'].replace("Bearer ", "");

    // Проверяем был ли прислан токен
    if (!token) {
        return res.status(403).json({error: "Вы не авторизованы!"});
    }

    // Валидация токена (проверка на совпадение с ключом от сервера)
    jwt.verify(token, SECRET_KEY, (err, user) => {
        // Обработка ошибки
        if (err) {
            return res.status(403).json({ message: "Токен недействителен!" });
        }

        next(); // Если токен валидный, пропускаем запрос
    })

}

module.exports = verifyToken;