const bcrypt = require('bcrypt'); // Шифрование паролей
const jwt = require('jsonwebtoken'); // Библиотека JWT токенов
const sql = require('../middleware/db'); // Запросы в БД

// Контроллер для авторизации пользователей
async function auth(req, res) {

    const login = req.body.login;
    const password = req.body.password;

    if (!login && !password) {
        res.status(403).json({ message: "Введите логин и пароль!" });
        return;
    }

    try {
        // Ищем пользователя в БД
        const [[user]] = await sql.query('SELECT * FROM `users` WHERE `name`="' + login + '"');
    
        // const salt = bcrypt.genSaltSync(5);
        // const hashPassword = bcrypt.hashSync(password, salt);
        // console.log(hashPassword);
    
        if (!user || user == undefined) {
            res.status(400).json({ message: "Неверный логин или пароль" });
            return;
        }
    
        // Проверяем совпадает ли введенный пароль с паролем из БД
        const isValidPassword = bcrypt.compareSync(password, user.password);
    
        if (!isValidPassword) {
            res.status(400).json({ message: "Неверный логин или пароль" });
            return;
        }
    
        /**
         * jwt.sign - генерация и подпись токена
         * @param payload - данные получаемые от пользователя
         * @param SECRET_KEY - секретный ключ для проверки токена
         * @param options
         */
    
        // Генерируем токен
        const token = jwt.sign({ login }, SECRET_KEY, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Ошибка при выполнении запроса" });
    }
}

exports.auth = auth;