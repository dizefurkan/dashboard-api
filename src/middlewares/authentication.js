import jwt from 'jsonwebtoken';

const secretKey = 'teadizefurkan';

export default async (req, res, next) => {
  const token = req.headers['x-accesstoken'];
  if (!token) {
    res.status(401).send({
      error: 'Token not exist'
    });
  }
  try {
    await jwt.verify(token, secretKey);
    next();
  } catch (err) {
    res.status(401).send(err)
  }
};
