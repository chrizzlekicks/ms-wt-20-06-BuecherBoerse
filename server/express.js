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
      styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
      fontSrc: ['https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'https://ik.imagekit.io'],
      baseUri: ["'self'"],
    },
  })
);
// Cross Origin Resource Sharing
app.use(cors());

// Serve up static files when deployed
if (config.env === 'production') {
  app.use(express.static(path.join(CURRENT_WORKING_DIR, 'client/build')));
}

// use morgan for logging
// Use rate-limiter

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', bookRoutes);
app.use('/', conversationRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR + '/client/build/index.html'));
  if (err) {
    res.status(500).send(err);
  }
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  }
});

export default app;
