import express from 'express';
import logger from 'morgan';
import connect_DB from './src/models/index.js';
import indexRouter from './src/routes/index.js';
import partyRouter from './src/routes/party.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
connect_DB();
// app.set('public', path.join(__dirname, 'public'));
// app.use('/public', path.join(__dirname, 'public'));
// app.use(express.static('public'));
app.use('/public', express.static('public'));
console.log(path.join(__dirname, 'public'));
// console.log(app.get());
// app.set('views', path.join(__dirname, 'public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/party', partyRouter);
export default app;