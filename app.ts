import express from 'express';
import logger from 'morgan';
import path from 'path';
import connect_DB from './src/models/index';
import indexRouter from './src/routes/index';
import partyRouter from './src/routes/party';

const app = express();
connect_DB();
app.use('/public', express.static('public'));
// app.use('/public', express.static(path.join(__dirname, "../public")));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/party', partyRouter);

module.exports = app;
