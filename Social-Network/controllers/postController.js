const sql = require('../middleware/db');

// Получить все посты
exports.getAllPosts = async (req, res) => {
    const [users] = await sql.query('SELECT * FROM `users`');
    const [posts] = await sql.query('SELECT * FROM `posts`');
    const result = [];
    for (let post of posts) {
        post.author = 
        result.push(post);
    }

    res.json({message: result});
};

// Создание поста
exports.addPost = async (req, res) => {
    const { userId, text, img } = req.body;
    // Проверяем что все необходимые данные получены
    if (userId && (text || img)) {
        const query = 'INSERT INTO posts (author, text, img) VALUES (?, ?, ?)';
        const response = await sql.query(query, [userId, text, img]);
        console.log(response);
        if (response) {
            res.status(200).json({ message: "OK" })
        }
    }
}