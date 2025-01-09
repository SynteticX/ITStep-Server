// REST API Server
const express = require('express');
const cors = require('cors');
const PORT = 3000;

const app = express();

// Импорт маршрутов
const apiRoutes = require('./routes/apiRoutes'); // Маршрут API

// Middleware
app.use(cors()); // Разрешаем подключение с любого IP
app.use(express.json()); // Парсим JSON запросы

// Маршрутизация
app.use('/api', apiRoutes);

// GET-запрос
app.get('/', (req, res) => {
    res.send("Сервер онлайн");
});

app.listen(PORT, () => {
    console.log("Сервер запущен на порту " + PORT);
});