const express = require('express');
const { registerUser, loginUser, registerAdminUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/register-admin', registerAdminUser);

module.exports = router;
