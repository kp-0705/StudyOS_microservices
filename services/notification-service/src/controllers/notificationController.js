const Notification = require('../models/Notification');
const nodemailer = require('nodemailer');

// Mock transporter (in real app, use actual SMTP settings)
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: 'studyos-mock@ethereal.email',
    pass: 'mockpassword'
  }
});

exports.sendNotification = async (req, res) => {
  try {
    const { userId, message, type } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: 'UserId and message are required' });
    }

    // Save to DB
    const notification = await Notification.create({
      user: userId,
      message,
      type: type || 'reminder'
    });

    // Mock sending email
    console.log(`[Notification Service] Sending email to user ${userId}: ${message}`);
    
    // In a real app, you would fetch user's email from Auth Service or User Service
    // and use transporter.sendMail(...)

    res.status(201).json({ 
      success: true, 
      notification,
      info: 'Email sent (mocked)' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending notification' });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};
