import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
import { Token } from '../models/tokenModel';
import { JWT } from '../graphql/user/userType';
const router = express.Router();

function generateAccessToken(data) {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
}
router.post('/login', async (req: Request, res: Response) => {
  if (!('id' in req.body) || !('password' in req.body)) {
    return res.status(400).send('need_id_and_password');
  }
  try {
    const { id, password } = req.body;
    const userDoc = await UserModel.findOne({ uid: id });
    if (userDoc === null) {
      return res.status(400).send('invalid_id');
    }
    if (!(await bcrypt.compare(password, userDoc.password))) {
      return res.status(400).send('invalid_pw');
    }

    const pickedInfo = (({ _id, uid, nickName }) => ({ _id, uid, nickName }))(userDoc);
    const accessToken = generateAccessToken(pickedInfo);
    const refreshToken = jwt.sign(pickedInfo, process.env.REFRESH_TOKEN_SECRET);
    const storedToken = await new Token({ tokenId: refreshToken });
    await storedToken.save();
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(400).send('login_failed');
  }
});

router.delete('/logout', async (req: Request, res: Response) => {
  if (!('token' in req.body)) {
    return res.status(401).send('need_token');
  }
  await Token.deleteOne({ tokenId: req.body.token });
  res.status(204);
});

router.post('/token', async (req: Request, res: Response) => {
  if (!('token' in req.body)) {
    return res.status(401).send('need_token');
  }
  if (!(await Token.findOne({ tokenId: req.body.token }))) {
    return res.status(403).send('invalid_token');
  }
  const { _id, uid, nickName } = jwt.verify(req.body.token, process.env.REFRESH_TOKEN_SECRET) as JWT;
  const accessToken = generateAccessToken({ _id, uid, nickName });
  res.status(200).json({ accessToken });
});

router.post('/token');

export default router;
