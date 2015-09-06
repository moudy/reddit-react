import dotenv from  'dotenv';
dotenv.load();

import express from 'express';
import router from './router';

export const app = express();

app.use(router);

app.listen(process.env.PORT, () => {
  console.log('Listening on port:', process.env.PORT); // eslint-disable-line no-console
});
