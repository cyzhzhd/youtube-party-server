import express from 'express';
import logger from 'morgan';

import partyRouter from './routes/party';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('server is working');
});

app.use('/party', partyRouter);
module.exports = app;
