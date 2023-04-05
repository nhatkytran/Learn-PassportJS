const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');

require('./config/database');
require('./config/passport');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter);

module.exports = app;
