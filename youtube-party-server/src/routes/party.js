import express from 'express';
const router = express.Router();

router.post('/create', function (req, res, next) {
  const { name, details, hostId } = req.body;
  res.status(200).send(name, details, hostId);
});

export default router;
