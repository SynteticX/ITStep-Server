const sql = require('../middleware/db');

// Получить все посты
exports.getAllPosts = async (req, res) => {
    const [posts] = await sql.query('SELECT * FROM `posts`');
    res.json({message: posts});
};

// Создание поста
exports.addPost = async (req, res) => {
    const { userId, text, img } = req.body;
    const query = 'INSERT INTO posts (author, text, img) VALUES (?, ?, ?)';
    const response = await sql.query(query, [userId, text, img]);
}