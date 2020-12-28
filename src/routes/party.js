import express from 'express';
import mongoose from 'mongoose';
import { Party } from '../models/partyModel.js';

const router = express.Router();

router.get('/', async (req,res) => {
  try {
    const parties = await Party.find({});
    res.status(200).send(parties);
  } catch(error) {
    console.error("Party.find error", error);
  }
})

router.post('/create', async (req, res, next) => {
  // need to add host Id after setting web socket server
  const { name, description } = req.body;

  if( !name || !description ) {
    res.status(405).send("not enough parameter");
  }

  try {
    const party = new Party({
      name,
      description,
      startTime: new Date(),
    });

    party.save();
    res.status(201).send("new part is created");
  } catch (error) {
    console.log('creating party error', error);
  }
  // res.status(200).send(name, description, hostId);
});

export default router;
