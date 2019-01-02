import BaseService from 'services/base';
import ProductSchema from 'models/product';
import validators from './validators';

const endpoints = [
  {
    path: '/product',
    method: 'post',
    validation: validators.product,
    handlers: 'insert'
  },
  {
    path: '/product',
    method: 'put',
    handlers: 'update'
  },
  {
    path: '/product',
    method: 'delete',
    handlers: 'delete'
  }
];

class Product extends BaseService {
  insert = async (req, res) => {
    const { name } = req.body;
    const slug = name.toLowerCase().match(/[^ ]+/g).join('-');
    req.body.slug = slug;
    const isSlugSame = await ProductSchema.find({ slug });
    if (isSlugSame.length === 0) {
      ProductSchema.create(req.body, (err, product) => {
        if (err) res.status(500).send(err);
        res.status(200).send(product);
      });
    }
    return {
      status: 500,
      body: 'Bu urun zaten var'
    };
  }

  update = () => ({
    status: 200,
    body: {}
  });

  delete = () => ({
    status: 200,
    body: {}
  })
}

export default new Product({}, endpoints, {});
