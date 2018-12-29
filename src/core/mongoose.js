/* eslint-disable no-console */
import mongoose from 'mongoose';

const HOST = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB;

const url = `mongodb://${HOST}:${PORT}/${DB_NAME}`;

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const connect = () => mongoose.connect(
  url, { useNewUrlParser: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
      setTimeout(connect, 1000);
    } else { console.log('Mongo connected'); }
  }
);


export default connect;
