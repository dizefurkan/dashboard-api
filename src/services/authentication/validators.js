import Joi from 'joi';


export default {
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required()
    }
  }
};
