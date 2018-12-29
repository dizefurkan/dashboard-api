import express from 'core/express';
import connectMongoose from 'core/mongoose';


connectMongoose();

const { app, config } = express;

app.listen(
  config.PORT,
  () => {
    // eslint-disable-next-line
    console.log(`Application run at http://localhost:${config.PORT}`);
  },
);


export default app;
