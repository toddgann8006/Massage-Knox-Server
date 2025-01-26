const admin = require('firebase-admin');

// Initialize Firebase Admin with your service account
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
});

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