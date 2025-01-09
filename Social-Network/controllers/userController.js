const sql = require('../middleware/db');

// Получаем всех пользователей
exports.getAllUsers = async (req, res) => {
    const [users] = await sql.query('SELECT * FROM `users`');
    res.json({message: users});
}

// Получаем инфу о конкретном пользователе
exports.getUser = async (req, res) => {
    const userId = req.params.id;
    const [user] = await sql.query('SELECT * FROM `users` WHERE `id`=' + userId);
    res.json({message: user});
}

