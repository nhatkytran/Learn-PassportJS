const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));

app.use(cors());
app.options('*', cors());

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET!',
  });
});

app.delete('/delete', (req, res, next) => {
  res.status(200).json({
    message: 'DELETE!',
  });
});

app.listen(3000, '127.0.0.1', () => console.log('App running on port 3000...'));
