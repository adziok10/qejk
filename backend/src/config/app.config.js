module.exports = {
    jwt_secret: 'Zadffgqw123',
    jwt_expires_in: 3600 * 24,
    port:  process.env.PORT || 3000,
    image_destination: 'imgur', // 'imgur' and 'node' (save on '/uploads' in your app folder)
    imgur_ID: '5f03887a8b60ca2',
};