module.exports = {
    jwt_secret: 'secret',
    jwt_expires_in: 3600 * 24,
    port: 3000 || process.env.PORT,
    image_destination: 'imgur', // 'imgur' and 'node' (save on '/uploads' in your app folder)
    imgur_ID: 'imurid',
};