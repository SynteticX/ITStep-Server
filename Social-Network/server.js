const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

// Указываем политику безопасности подключений
app.use(cors());
// Распаковываем поступающие JSON объекты
app.use(express.json());

// Вывод всех постов из БД
app.get('/', async (req, res) => {
    const [results] = await pool.query('SELECT * FROM `posts`');
    res.send(results);
});

// Отправка поста
app.post('/addpost', async (req, res) => {
    const { data } = req.body;
    const query = `INSERT INTO posts (author, text, img) VALUES (?, ?, ?)`;
    const [results] = await pool.query(query, [data.author, data.text, data.img])
});

app.listen(3000, () => {
    console.log("Server started");
})