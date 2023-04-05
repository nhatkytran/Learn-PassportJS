const mongoose = require('mongoose');

mongoose
  .set('strictQuery', true)
  .connect(
    `mongodb+srv://nhockkutean2:${process.env.DATABASE_PASSWORD}@cluster0.mdq4m7g.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Database connection - Successful'));
