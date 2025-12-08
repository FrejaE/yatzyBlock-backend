import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { userRouter } from './routes/userRoute.mjs';
import { gameRouter } from './routes/gameRoute.mjs';
import { highScoreRouter } from './routes/highScoreRoute.mjs';

dotenv.config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URL;

if (!dbUrl) {
  throw Error('No MONGO_URL in the .env file');
}

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/login', userRouter);
app.use('/games', gameRouter);
app.use('/highscore', highScoreRouter);

app.listen(port, async (error) => {
  await mongoose.connect(dbUrl);
  console.log('API is alive, connected to database');
  if (error) {
    console.log('ERROR', error);
  }
});
