const sql = require('../middleware/db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const data = req.body;
    if (!data.login && !data.password) {
        res.status(400).json({ message: "Введите логин и пароль!" });
    }
    // Проверяем существует ли логин
    const [user] = await sql.query('SELECT * FROM `users` WHERE `name`="' + data.login + '"');
    if (user.length == 0) {
        // Хешируем пароль
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(data.password, salt);

        // Защищаем запрос от SQL-иньекций, подстраивая абстрактные переменные в VALUES
        const query = 'INSERT INTO users (name, password) VALUES (?, ?  )';
        const response = await sql.query(query, [data.login, hashPassword]);
    }
}

module.exports = register;