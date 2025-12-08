import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/userController.mjs';

export const userRouter = express.Router();
userRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).send('Missing fields in body');
    } else {
      const user = await createUser(username, email, password);
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    console.log('user');
    console.log(user);
    user ? res.json(user) : res.status(404).send('User not found');
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

userRouter.put('/:id', async (req, res) => {
  try {
    const updated = await updateUser(req.params.id, req.body);
    updated ? res.json(updated) : res.status(404).send('User not found');
  } catch (err) {
    res.status(500).send(err);
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    deleted ? res.json(deleted) : res.status(404).send('User not found');
  } catch (err) {
    res.status(500).send(err);
  }
});
