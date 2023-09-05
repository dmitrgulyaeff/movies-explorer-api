require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { MONGODB_URL, PORT } = require('./utils/config');

const app = express();

app.use(cors());
app.use(helmet());

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
