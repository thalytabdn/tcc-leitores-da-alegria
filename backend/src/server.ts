import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import memberRoutes, { route } from './routes/Member';
import eventRoutes from './routes/Event';
import supporterRoutes from './routes/Supporter';
import audioBookRoutes from './routes/AudioBook';
import formRoutes from './routes/Form';
import userRoutes from './routes/User';
import infoRoutes from './routes/Info';
import imageRoutes from './routes/Image';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
  .then(() => {
    Logging.info('Connected to mongoDB.');
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect: ');
    Logging.error(error);
  });

/** Start the server only if Mongo connects*/
const StartServer = () => {
  app.use((req, res, next) => {
    /** Log the Request */
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      /**Log the Response */
      Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - Status: [${res.statusCode}]`);
    });

    next();
  });

  /** Rules of the API */
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use('/api', memberRoutes);
  app.use('/api', formRoutes);
  app.use('/api', eventRoutes);
  app.use('/api', supporterRoutes);
  app.use('/api', audioBookRoutes);
  app.use('/api', userRoutes);
  app.use('/api', infoRoutes);
  app.use('/api', imageRoutes);

  /** Helthcheck */
  app.get('/ping', (req, res, next) => {
    res.status(200).json({ message: 'pong' });
  });

  app.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Leitores da Alegria API :)' });
  });

  /**Error handling */
  app.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message: error.message });
  });

  app.listen(config.server.PORT, () => {
    Logging.info(`Server is running on port ${config.server.PORT}...`);
  });
};
