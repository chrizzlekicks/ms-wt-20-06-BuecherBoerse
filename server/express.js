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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

// Secure apps
app.use(helmet());
// Cross Origin Resource Sharing
app.use(cors());

// Serve up static files when deployed
if (config.env === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// use morgan for logging
// Use rate-limiter

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', bookRoutes);
app.use('/', conversationRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
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
