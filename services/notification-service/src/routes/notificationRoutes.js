const express = require('express');
const router  = express.Router();
const { sendNotification, getUserNotifications } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/send', sendNotification); // Can be internal
router.get('/', protect, getUserNotifications);

module.exports = router;
