import express from 'express';

import services from 'services';


const app = express();

services.forEach(({ method, path, handlers }) => {
  app[method](path, ...handlers);
});


export default app;
