import express from 'express';
import logger from 'morgan';

import partyRouter from './routes/party.js';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).send('server is working fine');
});

app.use('/party', partyRouter);
export default app;
