import express from 'express';
import mongoose from 'mongoose';
import { Party } from '../models/partyModel.js';

const router = express.Router();

router.get('/', (req,res) => {

  res.status(200).send("success~!");
})

router.post('/create', async (req, res, next) => {
  const { name, description, hostId } = req.body;

  if(name || description || hostId) {
    res.status(405).send("not enough parameter");
  }

  try {
    const party = new Party({
      name,
      description,
      hostId,
      startTime: new Date(),
    });

    const result = party.save();
    res.status(201).json(result);
  } catch (error) {
    console.log('creating party error', error);
  }
  // res.status(200).send(name, description, hostId);
});

export default router;
