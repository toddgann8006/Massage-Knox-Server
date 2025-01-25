const express = require('express');
const router = express.Router();
const { sendNotification } = require('../services/notification');

router.post('/notifications', async (req, res) => {
    try {
        const { title, body } = req.body;
        const result = await sendNotification(title, body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
