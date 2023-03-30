const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRoutes');

dotenv.config({ path: path.join(__dirname, 'config.env') });

const { PORT, DATABASE_PASSWORD } = process.env;

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs');
// If the folder also named "views" --> Don't need to declare the path
// app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/auth', authRouter);

let server;

mongoose.set('strictQuery', true);
mongoose
  .connect(
    `mongodb+srv://nhockkutean2:${DATABASE_PASSWORD}@cluster0.mdq4m7g.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Database connection - Successful');

    // Get PORT when deployed
    const port = PORT || 3000;
    server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  });

process.on('unhandledRejection', error => {
  console.error('\n--- UNHANDLED REJECTION! Shutting down... ---\n');
  console.error(error);

  if (server) server.close(() => process.exit(1));
});
