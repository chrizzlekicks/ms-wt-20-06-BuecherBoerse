import express from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import conversationRoutes from './routes/conversation.routes';
import path from 'path';
import config from '../config/config';

import winston from 'winston';
import expressWinston from 'express-winston';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

// Secure apps
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
            styleSrc: [
                "'self'",
                'https://fonts.googleapis.com',
                "'unsafe-inline'"
            ],
            fontSrc: ['https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'https://ik.imagekit.io'],
            baseUri: ["'self'"]
        }
    })
);
// Cross Origin Resource Sharing
app.use(cors());

// Serve up static files when deployed
if (config.env === 'production') {
    app.use(express.static(path.join(CURRENT_WORKING_DIR, 'client/build')));
}

// rate-limiter-flexible

// use winston and express-winston for logging
app.use(expressWinston.logger({
    transports: [
    new winston.transports.Console()
    ],
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/messages', conversationRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(CURRENT_WORKING_DIR + '/client/build/index.html'));
    if (err) {
        res.status(500).send(err);
    }
});

// use winston and express-winston for error logging
app.use(expressWinston.errorLogger({
    transports: [
    new winston.transports.Console()
    ],
    format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
    )
}));

export default app;
