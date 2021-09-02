const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri:
        process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' + (process.env.MONGO_PORT || '27017') + '/userlogin',
    mailUser: process.env.mail_user,
    mailPass: process.env.mail_pass,
    mailFrom: process.env.mail_from,
    mailSmtpServer: process.env.mail_server,
    passwortResetSalt: process.env.passwort_reset_salt || "YOUR_secret_key",
    ImagePublicKey: process.env.imagekit_pub_key,
    ImagePrivateKey: process.env.imagekit_private_key,
    ImageUrlEndpoint: process.env.imagekit_url_endpoint
};

export default config;
