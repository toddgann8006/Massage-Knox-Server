const admin = require('firebase-admin');

const sendNotification = async (title, body) => {
    try {
        const message = {
            notification: {
                title,
                body
            },
            topic: 'all'
        };

        const response = await admin.messaging().send(message);
        return { success: true, response };
    } catch (error) {
        console.error('Error sending notification:', error);
        throw error;
    }
};

module.exports = { sendNotification };