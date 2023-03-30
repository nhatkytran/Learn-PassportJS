const express = require('express');
const morgan = require('morgan');
const { Worker } = require('worker_threads');

// https://www.udemy.com/course/advanced-node-for-developers/learn/lecture/9646770#questions/16733352

console.log(Worker);

const app = express();

app.use(morgan('dev'));

const doWork = duration => {
  const start = Date.now();

  while (Date.now() - start < duration) {}
};

app.get('/', (req, res) => {
  doWork(1000);

  res.send('Welcome!');
});

app.listen(3000, '127.0.0.1', () => console.log('App running on port 3000...'));
