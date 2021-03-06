import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import connect_DB from './src/models/index';
import indexRouter from './src/routes/index';
import partyRouter from './src/routes/party';

const app = express();

const allowedOrigins = ['http://localhost:3001', 'https://www.utubeparty.com'];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


connect_DB();
app.use('/', express.static('build'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/party', partyRouter);

module.exports = app;
