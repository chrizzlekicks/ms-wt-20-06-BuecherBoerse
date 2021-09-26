const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' +
      (process.env.IP || 'localhost') +
      ':' +
      (process.env.MONGO_PORT || '27017') +
      '/userlogin',
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  mailFrom: process.env.MAIL_FROM,
  mailSmtpServer: process.env.MAIL_SERVER,
  passwortResetSalt: process.env.PASSWORD_RESET_SALT || 'YOUR_secret_key',
  ImagePublicKey: process.env.IMAGEKIT_PUB_KEY,
  ImagePrivateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  ImageUrlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
};

export default config;
