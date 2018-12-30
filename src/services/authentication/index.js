import BaseService from 'services/base';
import User from 'models/user';
import validators from './validators';


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

    const result = await User.findOne({ username });
    if (result) {
      return {
        status: 200,
        body: result.toJSON()
      };
    }

    return {
      status: 400,
      body: { error: 'username or password is invalid!' }
    };
  }

  me = async (req) => {
    if (req.get('X-AccessToken') === '221f3ffeef06c9e14012a2b79278f9b474d63718399c9a381a10a44b5896a1cc') {
      return {
        status: 200,
        body: {
          username: 'talha',
          email: 'talhaeminaydemir@gmail.com',
          photo: 'https://dummyimage.com/300x300/000/fff',
          token: '221f3ffeef06c9e14012a2b79278f9b474d63718399c9a381a10a44b5896a1cc'
        }
      };
    }

    return {
      status: 401,
      body: {}
    };
  }
}


export default new Authentication({}, endpoints, {});
