import express from 'express';
import cors, { CorsOptions } from 'cors';
import mongoose, { Error } from 'mongoose';
import config from './utils/config';
import logger from './utils/logger';
import middleware from './utils/middleware';
import authRouter from './routes/auth';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/user';

const app = express();

logger.info('connecting to', config.MONGODB_URI);

if (!config.MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in config');
}

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error: Error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

const options: CorsOptions = {
  credentials: true,
  origin: config.allowedOrigins,
};

app.use(cors(options));
app.use(express.static('dist'));
app.use(express.json());
app.use(cookieParser());
app.use(middleware.requestLogger);
app.use(middleware.extractToken);

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
