import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import bookRoutes from './routes/book.routes';
import conversationRoutes from './routes/conversation.routes';
import path from 'path';

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
// Secure apps
app.use(helmet());
// Cross Origin Resource Sharing
app.use(cors());

app.use(express.static(path.join(CURRENT_WORKING_DIR, 'client/build')));

// mount routes
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', bookRoutes);
app.use('/', conversationRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(CURRENT_WORKING_DIR, 'client/build/index.html'));
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  }
});

export default app;
