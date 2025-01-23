// Route /auth
const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/verifyToken');

// Контроллеры
const authController = require('../controllers/authController');
const registerController = require('../controllers/registerController');

// Обработка маршрутов
router.post("/login", authController.auth);
router.post("/register", registerController);
router.post("/verifyToken", verifyToken, (req, res) => {res.json({status: "OK"})});

module.exports = router;