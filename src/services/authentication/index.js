import BaseService from 'services/base';
import validators from './validators';
import User from 'models/user';
import jwt from 'jsonwebtoken';

const secretKey = 'teadizefurkan';

const endpoints = [
  {
    path: '/authentication/login',
    method: 'post',
    validation: validators.login,
    handlers: 'login'
  },
  {
    path: '/authentication/me',
    method: 'get',
    handlers: 'me'
  }
];


export class Authentication extends BaseService {
  login = async (req) => {
    const { username, password } = req.body;

    const result = await User.findOne({ username, password });
    if (result) {
      const token = jwt.sign({ id: result._id, username, password}, secretKey, {});
      return {
        status: 200,
        body: {
          token
        }
      };
    }

    return {
      status: 400,
      body: { error: 'username or password is invalid!' }
    };
  }

  me = async (req) => {
    const token = req.headers['x-accesstoken'];
    if (!token) {
      return {
        status: 401,
        body: {
          error: 'Token not exist'
        }
      };
    }
    const result = await jwt.verify(token, secretKey);
    return {
      status: 200,
      body: {
        message: result
      }
    }
  }
}


export default new Authentication({}, endpoints, {});
