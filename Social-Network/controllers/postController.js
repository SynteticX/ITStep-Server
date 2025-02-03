const sql = require('../middleware/db');

// Получить все посты
exports.getAllPosts = async (req, res) => {
    const [users] = await sql.query('SELECT * FROM `users`');
    const [posts] = await sql.query('SELECT * FROM `posts`');
    const result = [];

    for (let post of posts.reverse()) {
        post.author = users.find((u) => u.id == post.author).name;
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

exports.likePost = async (req, res) => {
    const { userId, postId } = req.body;
    if (userId, postId) {
        const query = "SELECT * FROM `posts` WHERE id = ?";
        const [response] = await sql.query(query, [ postId ]);

        // Если пост найден
        if (response.length > 0) {
            const post = response[0];
            let likes = post.likes.split(",");
            if (post.likes) {
                const user_like = likes.find(uid => parseInt(uid) == userId);
                if (user_like === undefined) {
                    likes.push(userId);
                } else {
                    // Если пользователь уже лайкал, удаляем его лайк
                    likes.splice(likes.indexOf(user_like), 1);
                }
            } else {
                likes.push(userId);
            }

            const like_query = "UPDATE posts SET likes = ? WHERE id = ?";
            const like_response = await sql.query(like_query, 
                [ likes.toString(), postId ]);
            if (like_response[0].changedRows > 0) {
                res.status(200).json({ message: "Данные успешно изменены!" });
            }
        }
    }
}