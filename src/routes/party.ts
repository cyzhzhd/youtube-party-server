import express from 'express';
import { Party } from '../models/partyModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const parties = await Party.find({});
    res.status(200).send(parties);
  } catch (error) {
    console.error("Party.find error", error);
  }
})

router.post('/create', async (req, res) => {
  const { name, description, hostId } = req.body;

  console.log(hostId);
  if (!name || !description) {
    res.status(405).send("not enough parameter");
  }

  try {
    const party = await new Party({
      name,
      description,
      hostId,
      startTime: new Date(),
    });

    party.save();
    res.status(201).send(party);
  } catch (error) {
    console.log('creating party error', error);
  }
  // res.status(200).send(name, description, hostId);
});


export default router;
