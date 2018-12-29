import Joi from 'joi';


const getValidationMiddleware = endpoint => ((req, res, next) => {
  const errors = {};
  if (endpoint.validation.body) {
    const { error, value } = Joi.validate(req.body, endpoint.validation.body);
    if (error) errors.body = error;
    else req.body = value;
  }

  if (endpoint.validation.query) {
    const { error, value } = Joi.validate(req.query, endpoint.validation.query);
    if (error) errors.query = error;
    else req.query = value;
  }

  if (errors.body || errors.query) {
    res.send({ errors }).status(400);
  } else {
    next();
  }
});

const makeHandler = handler => (async (req, res, next) => {
  try {
    const response = await handler(req, res, (params) => {
      if (params) next(params);
      else next();
    });

    if (response) {
      res.send(response.body).status(response.status);
    }
  } catch (error) {
    next(error);
  }
});


export default endpoint => ({
  method: endpoint.method,
  path: endpoint.path,
  handlers: [
    getValidationMiddleware(endpoint),
    ...endpoint.handlers.map(handler => makeHandler(handler))
  ]
});
