// Route /auth
const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/verifyToken');

// Контроллеры
const authController = require('../controllers/authController');

// Обработка маршрутов
router.post("/login", authController.auth);
router.post("/verifyToken", verifyToken, (req, res) => {res.json({status: "OK"})});

module.exports = router;