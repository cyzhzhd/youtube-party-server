import express from 'express';
import logger from 'morgan';
import connect_DB from './models/index.js';

import partyRouter from './routes/party.js';

const app = express();
connect_DB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('server is working');
});

app.use('/party', partyRouter);
export default app;
