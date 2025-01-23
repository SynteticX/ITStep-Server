// Route /api
const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/verifyToken');

// Контроллеры
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

// Обработка пути /api/users
router.get('/users', verifyToken, userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.get('/posts', postController.getAllPosts);

module.exports = router;