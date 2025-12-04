import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  throw Error('No MONGO_URL in the .env file');
}

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Lyckades');
});

app.listen(port, async (error) => {
  await mongoose.connect(dbUrl);
  console.log('API is alive, connected to database');
  if (error) {
    console.log('ERROR', error);
  }
});
