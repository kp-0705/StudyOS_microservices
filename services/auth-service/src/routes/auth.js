 
const express = require('express');
const router  = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  verifyToken
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login',    loginUser);
router.get('/me',        protect, getMe);
router.post('/verify',   verifyToken); // called by other services

module.exports = router;