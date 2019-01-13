import jwt from 'jsonwebtoken';
import whitelist from './whitelist';
import { baseUrl } from 'config/express';

const secretKey = 'teadizefurkan';

export default async (req, res, next) => {
  whitelist.map(url => {
    if (req.originalUrl === `${baseUrl}${url}`) return next();
  });

  const token = req.headers['x-accesstoken'];

  if (!token) {
    return res.status(401).send({
      error: 'Token not exist'
    });
  }
  try {
    await jwt.verify(token, secretKey);
    return next();
  } catch (err) { return res.status(401).send(err); }
};
