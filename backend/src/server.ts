import express from 'express';
import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

import cors from 'cors';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333, () => {
    console.log('Servidor rodando...');
});
