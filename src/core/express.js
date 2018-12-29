import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';

import errorHandler from 'middlewares/errorHandler';
import config from 'config/express';

import router from './router';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan(config.morgan));
app.use(methodOverride());
app.use('/api/v1/', router);
app.use(errorHandler);


export default {
  app,
  config
};
