const sql = require('../middleware/db');

// Получить все посты
exports.getAllPosts = async (req, res) => {
    const [posts] = await sql.query('SELECT * FROM `posts`');
    res.json({message: posts});
};