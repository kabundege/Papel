import express from 'express';
import bodyParser from 'body-parser';
import user from './routes/user';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', user);

export default app;
