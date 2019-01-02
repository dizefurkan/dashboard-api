import Joi from 'joi';

export default {
  product: {
    body: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      sale_price: Joi.number().required(),
      in_stock: Joi.boolean().required(),
      productimage_set: Joi.array()
        .items(Joi.object().keys({
          image: Joi.string().required(),
          status: Joi.boolean().required()
        }))
        .required()
    }
  }
};
