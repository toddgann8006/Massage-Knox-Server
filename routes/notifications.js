const express = require('express');
const router = express.Router();

router.post('/notifications', (req, res) => {
    const { title, body } = req.body;
    res.json({
        success: true,
        message: 'Notification received',
        data: { title, body }
    });
});

module.exports = router;
