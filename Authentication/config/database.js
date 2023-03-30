const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const { SESSION_SECRET, DATABASE_PASSWORD } = process.env;

exports.sessionOptions = {
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://nhockkutean2:${DATABASE_PASSWORD}@cluster0.mdq4m7g.mongodb.net/?retryWrites=true&w=majority`,
  }),
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
};

exports.connection = mongoose
  .set('strictQuery', true)
  .createConnection(
    `mongodb+srv://nhockkutean2:${DATABASE_PASSWORD}@cluster0.mdq4m7g.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .on('open', () => console.log('Database connected successfully!'));
