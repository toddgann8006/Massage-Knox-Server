const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.post('/', async (req, res) => {
    console.log('Request received:', req.body);
    const { title, body } = req.body;

    try {
        const message = {
            notification: {
                title,
                body
            },
            topic: 'all'
        };

        const response = await admin.messaging().send(message);

        res.json({
            success: true,
            message: 'Notification sent successfully',
            response
        });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending notification',
            error: error.message
        });
    }
});

module.exports = router;