import express from 'express';
import User from '../models/userSchema.mjs';
import Game from '../models/gameSchema.mjs';
import {
  createGame,
  deleteGame,
  getAllGames,
  getGameById,
  updateGame,
} from '../controllers/gameController.mjs';

export const gameRouter = express.Router();

// CREATE game
gameRouter.post('/', async (req, res) => {
  try {
    const { totalScore, createdBy, players } = req.body;

    if (!totalScore || !createdBy || !players) {
      return res.status(400).send('Missing fields');
    }

    const game = await createGame(totalScore, createdBy, players);
    res.status(201).json(game);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET all games
gameRouter.get('/', async (req, res) => {
  try {
    const games = await getAllGames();
    res.json(games);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET one game
gameRouter.get('/:id', async (req, res) => {
  try {
    const game = await getGameById(req.params.id);
    game ? res.json(game) : res.status(404).send('Game not found');
  } catch (err) {
    res.status(500).send(err);
  }
});

//UPDATE game
// BONUS : om man vill återuppta spel till FE
gameRouter.put('/:id', async (req, res) => {
  try {
    const updated = await updateGame(req.params.id, req.body);
    updated ? res.json(updated) : res.status(404).send('Game not found');
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE game
// BONUS: kunna ta bort spelade spel till FE
gameRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteGame(req.params.id);
    deleted ? res.json(deleted) : res.status(404).send('Game not found');
  } catch (err) {
    res.status(500).send(err);
  }
});

// // // POST /games
// gameRouter.post('/games', async (req, res) => {
//   try {
//     const { totalScore, createdBy, players } = req.body;

//     const game = await Game.create({
//       totalScore,
//       createdBy,
//       players,
//     });

//     // lägg till spelet i användarens games-lista
//     await User.findByIdAndUpdate(createdBy, {
//       $push: { games: game._id },
//     });

//     res.status(201).json(game);
//   } catch (err) {
//     res.status(400).json({ err });
//   }
// });
